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
import { PlatformKeyResponse, PlatformResponse } from '../../models';
import { CoreBuilder } from './../../../../core';
/**
 * 帶有鍵值的平台回傳結果建構者
 */
export declare class PlatformResponseBuilder implements CoreBuilder<PlatformKeyResponse> {
    private _key;
    private _response;
    /**
     * @param _key      鍵值
     * @param _response 平台回傳結果
     */
    constructor(_key: string, _response: PlatformResponse);
    /**
     * 建構資料
     *
     * @method public
     * @return 回傳建構結果
     */
    build(): PlatformKeyResponse;
}
