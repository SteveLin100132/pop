/**
 * 專案名稱： wistroni40-pop
 * 部門代號： MLD500
 * 檔案說明： 抽象建構者
 * @CREATE Tuesday, 16th November 2021 4:01:31 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

/**
 * 抽象建構者
 */
export interface CoreBuilder<T = any> {
  /**
   * 建構資料
   *
   * @method public
   * @return 回傳建構結果
   */
  build(): T;
}
