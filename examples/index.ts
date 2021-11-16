/**
 * 專案名稱： wistroni40-pop
 * 部門代號： MLD500
 * 檔案說明： 範例
 * @CREATE Tuesday, 16th November 2021 4:13:01 pm
 * @author Steve Y Lin
 * @contact Wits.SteveYLin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { of } from 'rxjs';
import { MonitorFacade } from 'wistroni40-pop';
import * as bnft from '../mocks/bnft.json';
import * as dmc from '../mocks/dmc.json';
import * as sumk from '../mocks/sumk.json';

// 模擬效益平台上拋結果
const benefit = of(bnft);
// 模擬使用率平台上拋結果
const usage = of(sumk);
// 模擬異常事件報警中心上拋結果
const alarm = of(dmc);

const systemId = 'TEST';
const cron = '*/10 * * * * *';
const publishedApi = 'http://localhost:4000';
const monitor = new MonitorFacade({ systemId, cron, publishedApi });
monitor
  .addService('benefit-test', 'bnft', benefit)
  .addService('usage-test', 'sumk', usage)
  .addService('alarm-test', 'dmc', alarm)
  .execute();
