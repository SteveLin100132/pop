"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorFacade = void 0;
const Cron = require("node-schedule");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const wistroni40_backend_utility_1 = require("wistroni40-backend-utility");
const classes_1 = require("./classes");
const models_1 = require("./models");
/**
 * 運維管理平台心跳監控服務
 */
class MonitorFacade {
    /**
     * @param config 設定檔
     */
    constructor(config) {
        /**
         * 日誌
         */
        this._logger = new wistroni40_backend_utility_1.Log4js('MONITOR');
        /**
         * 各平台服務
         */
        this.service = new Map();
        /**
         * 平台上拋結果
         */
        this.result = new Map();
        /**
         * 各平台上拋狀態
         */
        this.status = new Map();
        this.config = new models_1.MonitorConfigEntity(config);
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
    addService(id, type, service) {
        const key = `${type}.${id}`;
        const response = service.pipe(
        // 建立帶有鍵值的平台回傳結果建構者
        (0, operators_1.map)(res => new classes_1.PlatformResponseBuilder(key, res)), 
        // 建構帶有鍵值的平台回傳結果
        (0, operators_1.map)(builder => builder.build()));
        this.service.set(key, response);
        return this;
    }
    /**
     * 取得資料生產者
     *
     * @method public
     * @return 回傳資料生產者
     */
    producer() {
        return __awaiter(this, void 0, void 0, function* () {
            return new wistroni40_backend_utility_1.HttpProducerAdapter(this.config.publishedApi);
        });
    }
    /**
     * 設得心跳狀態
     *
     * @method public
     * @param response 各平台上拋回傳結果
     */
    setHeartBeat(response) {
        const systemid = this.config.systemId;
        const [type, , plant] = response.key.split('.');
        const heartbeat = this.status.get(plant) || new models_1.HeartBeatEntity({ systemid, plant });
        heartbeat.update(type, response.error === null ? 0 : 1);
        this.status.set(plant, heartbeat);
    }
    /**
     * 啟動各平台服務
     *
     * @method public
     */
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            // 取得資料生產者
            const producer = yield this.producer();
            const retry = new wistroni40_backend_utility_1.RetryProducerAdapter(producer);
            // 訂閱各平台服務上拋結果並保存至心跳
            const service = Array.from(this.service).map(item => item[1]);
            (0, rxjs_1.merge)(...service)
                .pipe((0, operators_1.tap)(r => this._logger.trace(r.key, `error: ${r.error !== null}`)))
                .subscribe(res => this.setHeartBeat(res));
            // 定期發送各平台上拋狀況(心跳)
            this._schedule = Cron.scheduleJob(this.config.cron, () => {
                this.status.forEach((status, key) => {
                    retry.publish(status, error => {
                        if (error) {
                            this._logger.error(key);
                            this._logger.error(error);
                        }
                        this._logger.info(key, JSON.stringify(status));
                        status.reset();
                    });
                });
            });
        });
    }
}
exports.MonitorFacade = MonitorFacade;
