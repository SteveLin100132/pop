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
import { Observable } from 'rxjs';
import { Producer } from 'wistroni40-backend-utility';
import { MonitorTemplate } from '../../core';
import { HeartBeat, MonitorConfig, PlatformKeyResponse, PlatformResponse, PlatformType } from './models';
/**
 * 運維管理平台心跳監控服務
 */
export declare class MonitorFacade implements MonitorTemplate<PlatformResponse> {
    /**
     * 日誌
     */
    private _logger;
    /**
     * 排程
     */
    private _schedule?;
    /**
     * 設定檔
     */
    private config;
    /**
     * 各平台服務
     */
    protected service: Map<string, Observable<PlatformKeyResponse<any>>>;
    /**
     * 平台上拋結果
     */
    protected result: Map<string, boolean>;
    /**
     * 各平台上拋狀態
     */
    protected status: Map<string, HeartBeat>;
    /**
     * @param config 設定檔
     */
    constructor(config: Partial<MonitorConfig>);
    /**
     * 添加服務
     *
     * @method public
     * @param id      服務 ID
     * @param type    平台類型
     * @param service 平台服務
     * @return 回傳物件本身
     */
    addService(id: string, type: PlatformType, service: Observable<PlatformResponse>): this;
    /**
     * 取得資料生產者
     *
     * @method public
     * @return 回傳資料生產者
     */
    producer(): Promise<Producer<HeartBeat>>;
    /**
     * 設得心跳狀態
     *
     * @method public
     * @param response 各平台上拋回傳結果
     */
    setHeartBeat(response: PlatformKeyResponse): void;
    /**
     * 啟動各平台服務
     *
     * @method public
     */
    execute(): Promise<void>;
}
