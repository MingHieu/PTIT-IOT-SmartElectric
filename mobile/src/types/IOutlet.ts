import {IDevice} from './IDevice';

export interface IOutlet {
  id: string;
  code: string;
  maxWattage: number;
  devices: IDevice[];
}
