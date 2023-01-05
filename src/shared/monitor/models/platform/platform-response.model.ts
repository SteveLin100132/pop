/**
 * 專案名稱： wistroni40-pop
 * 部門代號： MLD500
 * 檔案說明： 平台回傳結果資料模型
 * @CREATE Monday, 15th November 2021 6:20:34 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Bnft, ProducePayloadModel } from 'wistroni40-bnft';
import { AlarmModel } from 'wistroni40-dmc';
import { UsagePayload } from 'wistroni40-sumk';

/**
 * 平台回傳結果資料模型
 */
export interface PlatformResponse<T = any> {
  /**
   * 錯誤訊息
   */
  error?: any;
  /**
   * 回傳結果
   */
  result: T;
}

/**
 * 效益平台回傳結果型別
 */
export type BnftResponse = PlatformResponse<
  ProducePayloadModel<Bnft.BenefitSaving>
>;

/**
 * 使用率平台回傳結果型別
 */
export type SumkResponse = PlatformResponse<UsagePayload>;

/**
 * 異常事件報警中心回傳結果型別
 */
export type DmcResponse = PlatformResponse<AlarmModel>;

/**
 * 健康中心回傳結果型別
 */
export type DsmResponse = PlatformResponse<object>;
