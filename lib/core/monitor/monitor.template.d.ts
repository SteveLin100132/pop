/**
 * 專案名稱： wistroni40-pop
 * 部門代號： MLD500
 * 檔案說明： 抽象運維管理平台監控服務範本
 * @CREATE Tuesday, 16th November 2021 4:14:14 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */
import { Observable } from 'rxjs';
import { Producer } from 'wistroni40-backend-utility';
/**
 * 抽象運維管理平台監控服務範本
 */
export interface MonitorTemplate<R = any, P = any> {
    /**
     * 添加服務
     *
     * @method public
     * @param id      服務 ID
     * @param type    平台類型
     * @param service 平台服務
     * @return 回傳物件本身
     */
    addService(id: string, type: string, service: Observable<R>): MonitorTemplate;
    /**
     * 取得資料生產者
     *
     * @method private
     * @return 回傳資料生產者
     */
    producer(): Promise<Producer<P>>;
    /**
     * 啟動各平台服務
     *
     * @method public
     */
    execute(): void;
}
