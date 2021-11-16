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
import { MonitorConfig } from './monitor-config.model';
/**
 * 運維管理平台監控服務設定檔資料實體
 */
export declare class MonitorConfigEntity implements MonitorConfig {
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
    /**
     * @param config 設定檔
     */
    constructor(config?: Partial<MonitorConfig>);
}
