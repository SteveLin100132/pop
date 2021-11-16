# Library Name

# Install

```
npm i wistroni40-pop --save
```

# Table of Contents

- [Feature](#feature)
- [Usage](#usage)
- [Example](#example)

# Feature

- 提供運維管理平台心跳上拋服務
  - 整合效益平台上拋回傳結果
  - 整合使用率平台上拋回傳結果
  - 整合異常事件報警中心上拋回傳結果

# Usage

### Step 1

實例運維管理平台心跳上拋服務，並提供對應設定

```typescript
import { MonitorFacade } from 'wistroni40-pop';

const systemId = 'TEST';
const cron = '*/10 * * * * *';
const publishedApi = 'http://localhost:4000';
const monitor = new MonitorFacade({ systemId, cron, publishedApi });
```

#### Constructor

MonitorConfig

| Property     | Type   | Description              |
| ------------ | ------ | ------------------------ |
| systemId     | string | 系統 ID                  |
| cron         | string | 排程設定                 |
| publishedApi | string | 運維管理平台心跳上拋端口 |

### Step 2

添加四大平台上拋結果，並執行

> **需搭配使用以下套件所建立出的上拋服務，才可對接**

- 效益平台:
  [npm i wistroni40-bnft](https://www.npmjs.com/package/wistroni40-bnft)
- 使用率平台:
  [npm i wistroni40-sumk](https://www.npmjs.com/package/wistroni40-sumk)
- 異常事件報警中心:
  [npm i wistroni40-dmc](https://www.npmjs.com/package/wistroni40-dmc)
- 健康中心:

```typescript
monitor
  // 添加效益平台上拋結果監控
  .addService('benefit-test', 'bnft', benefit.sendCompleted)
  // 添加使用率平台上拋結果監控
  .addService('usage-test', 'sumk', usage.setSchedule(/** 排程設定 */))
  // 添加異常事件報警中心上拋結果監控
  .addService('alarm-test', 'dmc', alarm.execute())
  // 啟動各平台服務監控，並定期上拋心跳
  .execute();
```

#### Method

addService

| Property | Type                                 | Description                                                                          |
| -------- | ------------------------------------ | ------------------------------------------------------------------------------------ |
| id       | string                               | 服務 ID，必須唯一                                                                    |
| type     | PlatformType                         | 平台類型，`bnft`: 效益平台, `sumk`: 使用率平台, `dmc`: 異常事件中心, `dsm`: 健康中心 |
| service  | Observable&#60;PlatformResponse&#62; | 平台服務上拋結果監控                                                                 |

# Example

[範例參考](https://github.com/SteveLin100132/wistroni40-pop/blob/master/examples/index.ts)
