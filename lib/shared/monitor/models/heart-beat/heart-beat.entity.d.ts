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
import { PlatformType } from '../platform';
import { HeartBeat } from './heart-beat.model';
/**
 * 心跳資料實體
 */
export declare class HeartBeatEntity implements HeartBeat {
    /**
     * 廠別
     */
    plant: string;
    /**
     * 系統ID，以 POEM 平台註冊的為主
     */
    systemid: string;
    /**
     * 健康中心上拋狀況，0: 正常；1: 異常
     */
    todsm: number;
    /**
     * 使用率平台，0: 正常；1: 異常
     */
    tosumk: number;
    /**
     * 效益平台，0: 正常；1: 異常
     */
    tobenefit: number;
    /**
     * 異常事件報警中心，0: 正常；1: 異常
     */
    todmc: number;
    /**
     * 系統版本
     */
    systemversion: string;
    /**
     * 時間戳，13 碼 Epochtime
     */
    uploadtime: number;
    /**
     * @param heartbeat 心跳資料
     */
    constructor(heartbeat?: Partial<HeartBeat>);
    /**
     * 更新特定平台狀態
     *
     * @method public
     * @param type   平台類型
     * @param status 上拋狀態
     */
    update(type: PlatformType, status: number): void;
    /**
     * 狀態重製
     *
     * @method public
     */
    reset(): void;
}
