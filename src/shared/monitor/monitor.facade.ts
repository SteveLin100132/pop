/**
 * 專案名稱： wistroni40-pop
 * 部門代號： MLD500
 * 檔案說明： 運維管理平台監控服務
 * @CREATE Tuesday, 16th November 2021 3:58:25 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import * as Cron from 'node-schedule';
import { merge, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  HttpProducerAdapter,
  Log4js,
  Producer,
  RetryProducerAdapter,
} from 'wistroni40-backend-utility';
import { MonitorTemplate } from '../../core';
import { PlatformResponseBuilder } from './classes';
import {
  HeartBeat,
  HeartBeatEntity,
  MonitorConfig,
  MonitorConfigEntity,
  PlatformKeyResponse,
  PlatformResponse,
  PlatformType,
} from './models';

/**
 * 運維管理平台心跳監控服務
 */
export class MonitorFacade implements MonitorTemplate<PlatformResponse> {
  /**
   * 日誌
   */
  private _logger = new Log4js('MONITOR');
  /**
   * 排程
   */
  private _schedule?: Cron.Job;
  /**
   * 設定檔
   */
  private config: MonitorConfig;
  /**
   * 各平台服務
   */
  protected service = new Map<string, Observable<PlatformKeyResponse>>();
  /**
   * 平台上拋結果
   */
  protected result = new Map<string, boolean>();
  /**
   * 各平台上拋狀態
   */
  protected status = new Map<string, HeartBeat>();

  /**
   * @param config 設定檔
   */
  constructor(config: Partial<MonitorConfig>) {
    this.config = new MonitorConfigEntity(config);
  }

  /**
   * 添加服務
   *
   * @method public
   * @param id      服務 ID
   * @param type    平台類型
   * @param service 平台服務
   * @return 回傳物件本身
   */
  public addService(
    id: string,
    type: PlatformType,
    service: Observable<PlatformResponse>,
  ): this {
    const key = `${type}.${id}`;
    const response = service.pipe(
      // 建立帶有鍵值的平台回傳結果建構者
      map(res => new PlatformResponseBuilder(key, res)),
      // 建構帶有鍵值的平台回傳結果
      map(builder => builder.build()),
    );
    this.service.set(key, response);
    return this;
  }

  /**
   * 取得資料生產者
   *
   * @method public
   * @return 回傳資料生產者
   */
  public async producer(): Promise<Producer<HeartBeat>> {
    return new HttpProducerAdapter(this.config.publishedApi);
  }

  /**
   * 設得心跳狀態
   *
   * @method public
   * @param response 各平台上拋回傳結果
   */
  public setHeartBeat(response: PlatformKeyResponse): void {
    const systemid = this.config.systemId;
    const [type, , plant] = response.key.split('.');
    const heartbeat =
      this.status.get(plant) || new HeartBeatEntity({ systemid, plant });
    heartbeat.update(type as PlatformType, response.error === null ? 0 : 1);
    this.status.set(plant, heartbeat);
  }

  /**
   * 啟動各平台服務
   *
   * @method public
   */
  public async execute(): Promise<void> {
    // 取得資料生產者
    const producer = await this.producer();
    const retry = new RetryProducerAdapter(producer);

    // 訂閱各平台服務上拋結果並保存至心跳
    const service = Array.from(this.service).map(item => item[1]);
    merge(...service)
      .pipe(tap(r => this._logger.trace(r.key, `error: ${r.error !== null}`)))
      .subscribe(res => this.setHeartBeat(res));

    // 定期發送各平台上拋狀況(心跳)
    this._schedule = Cron.scheduleJob(this.config.cron, () => {
      this.status.forEach((status, key) => {
        retry.publish(status, error => {
          this._logger.info(key, JSON.stringify(status));
          if (error) {
            this._logger.error(error);
            return;
          }
          status.reset();
        });
      });
    });
  }
}
