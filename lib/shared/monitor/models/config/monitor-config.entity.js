"use strict";
/**
 * 專案名稱： wistroni40-pop
 * 部門代號： MLD500
 * 檔案說明： 運維管理平台監控服務設定檔資料實體
 * @CREATE Tuesday, 16th November 2021 4:06:11 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorConfigEntity = void 0;
/**
 * 運維管理平台監控服務設定檔資料實體
 */
class MonitorConfigEntity {
    /**
     * @param config 設定檔
     */
    constructor(config) {
        /**
         * 系統 ID
         */
        this.systemId = '';
        /**
         * 排程設定
         */
        this.cron = '0 */10 * * * *';
        /**
         * 運維管理平台心跳上拋端口
         */
        this.publishedApi = 'http://localhost:3000';
        Object.assign(this, config);
    }
}
exports.MonitorConfigEntity = MonitorConfigEntity;
