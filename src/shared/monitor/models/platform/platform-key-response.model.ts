/**
 * 專案名稱： wistroni40-pop
 * 部門代號： MLD500
 * 檔案說明： 帶有鍵值的平台回傳結果資料模型
 * @CREATE Tuesday, 16th November 2021 8:35:27 am
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { PlatformResponse } from './platform-response.model';

/**
 * 帶有鍵值的平台回傳結果資料模型
 */
export interface PlatformKeyResponse<T = any> extends PlatformResponse<T> {
  /**
   * 鍵值
   */
  key: string;
}
