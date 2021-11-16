/**
 * 專案名稱： wistroni40-pop
 * 部門代號： MLD500
 * 檔案說明： 運維管理平台監控服務設定檔資料模型
 * @CREATE Tuesday, 16th November 2021 4:04:52 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

/**
 * 運維管理平台監控服務設定檔資料模型
 */
export interface MonitorConfig {
  /**
   * 系統 ID
   */
  systemId: string;
  /**
   * 排程設定
   */
  cron: string;
  /**
   * 運維管理平台心跳上拋端口
   */
  publishedApi: string;
}
