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

import {
  BnftResponse,
  DmcResponse,
  DsmResponse,
  PlatformKeyResponse,
  PlatformResponse,
  PlatformType,
  SumkResponse,
} from '../../models';
import { CoreBuilder } from './../../../../core';

/**
 * 帶有鍵值的平台回傳結果建構者
 */
export class PlatformResponseBuilder
  implements CoreBuilder<PlatformKeyResponse>
{
  /**
   * @param _key      鍵值
   * @param _response 平台回傳結果
   */
  constructor(private _key: string, private _response: PlatformResponse) {}

  /**
   * 建構資料
   *
   * @method public
   * @return 回傳建構結果
   */
  public build(): PlatformKeyResponse {
    let key = this._key;
    const type = key.split('.')[0] as PlatformType;
    if (type === 'bnft') {
      // 效益平台廠別
      const response: BnftResponse = this._response;
      const plant = response.result.data.plant_code.replace(/-COMMON/g, '');
      key = `${key}.${plant}`;
    } else if (type === 'sumk') {
      // 使用率平台廠別
      const response: SumkResponse = this._response;
      const plant = response.result.plant;
      key = `${key}.${plant}`;
    } else if (type === 'dmc') {
      // 異常事件報警中心廠別
      const response: DmcResponse = this._response;
      const plant = response.result.plant;
      key = `${key}.${plant}`;
    } else if (type === 'dsm') {
      const response: DsmResponse = this._response;
      const plant = (response.result as { plant: string }).plant;
      key = `${key}.${plant}`;
    }
    return { key, ...this._response };
  }
}
