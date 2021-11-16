"use strict";
/**
 * 專案名稱： wistroni40-pop
 * 部門代號： MLD500
 * 檔案說明： 心跳資料實體
 * @CREATE Tuesday, 16th November 2021 9:54:17 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeartBeatEntity = void 0;
/**
 * 心跳資料實體
 */
class HeartBeatEntity {
    /**
     * @param heartbeat 心跳資料
     */
    constructor(heartbeat) {
        /**
         * 廠別
         */
        this.plant = '';
        /**
         * 系統ID，以 POEM 平台註冊的為主
         */
        this.systemid = '';
        /**
         * 健康中心上拋狀況，0: 正常；1: 異常
         */
        this.todsm = 0;
        /**
         * 使用率平台，0: 正常；1: 異常
         */
        this.tosumk = 0;
        /**
         * 效益平台，0: 正常；1: 異常
         */
        this.tobenefit = 0;
        /**
         * 異常事件報警中心，0: 正常；1: 異常
         */
        this.todmc = 0;
        /**
         * 系統版本
         */
        this.systemversion = '';
        /**
         * 時間戳，13 碼 Epochtime
         */
        this.uploadtime = new Date().getTime();
        Object.assign(this, heartbeat);
    }
    /**
     * 更新特定平台狀態
     *
     * @method public
     * @param type   平台類型
     * @param status 上拋狀態
     */
    update(type, status) {
        if (type === 'bnft') {
            this.tobenefit = this.tobenefit === 1 ? 1 : status;
        }
        else if (type === 'sumk') {
            this.tosumk = this.tosumk === 1 ? 1 : status;
        }
        else if (type === 'dmc') {
            this.todmc = this.todmc === 1 ? 1 : status;
        }
        else if (type === 'dsm') {
            this.todsm = this.todsm === 1 ? 1 : status;
        }
    }
    /**
     * 狀態重製
     *
     * @method public
     */
    reset() {
        this.todsm = 0;
        this.tobenefit = 0;
        this.tosumk = 0;
        this.todmc = 0;
    }
}
exports.HeartBeatEntity = HeartBeatEntity;
