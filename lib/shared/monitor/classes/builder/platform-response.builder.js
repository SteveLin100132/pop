"use strict";
/**
 * 專案名稱： wistroni40-pop
 * 部門代號： MLD500
 * 檔案說明： 帶有鍵值的平台回傳結果建構者
 * @CREATE Tuesday, 16th November 2021 8:33:45 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformResponseBuilder = void 0;
/**
 * 帶有鍵值的平台回傳結果建構者
 */
class PlatformResponseBuilder {
    /**
     * @param _key      鍵值
     * @param _response 平台回傳結果
     */
    constructor(_key, _response) {
        this._key = _key;
        this._response = _response;
    }
    /**
     * 建構資料
     *
     * @method public
     * @return 回傳建構結果
     */
    build() {
        let key = this._key;
        const type = key.split('.')[0];
        if (type === 'bnft') {
            // 效益平台廠別
            const response = this._response;
            const plant = response.result.data.plant_code.replace(/-COMMON/g, '');
            key = `${key}.${plant}`;
        }
        else if (type === 'sumk') {
            // 使用率平台廠別
            const response = this._response;
            const plant = response.result.plant;
            key = `${key}.${plant}`;
        }
        else if (type === 'dmc') {
            // 異常事件報警中心廠別
            const response = this._response;
            const plant = response.result.plant;
            key = `${key}.${plant}`;
        }
        else if (type === 'dsm') {
            // TODO: 添加健康中心
        }
        return Object.assign({ key }, this._response);
    }
}
exports.PlatformResponseBuilder = PlatformResponseBuilder;
