import { IUnit } from './iunits';

export interface IMaterial {
  id: number;
  name: string;
  unit: IUnit;
  lastUpdate: string;
  isActive: boolean;
}
