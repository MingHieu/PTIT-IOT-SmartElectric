import {IWattageRecord} from './IWattageRecord';

export interface IDevice {
  id: string;
  name: string;
  port: number;
  priority: number;
  state: boolean;
  offTime?: Date;
  wattageRecords: IWattageRecord[];
}
