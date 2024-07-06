import { IClient } from './iclient';
import { ILocalization } from './ilocalization';
import { IMaterial } from './imaterial';
import { IProperty } from './iproperty';
import { IStatus } from './istatus';
import { IType } from './itype';

export interface IJob {
  id: number;
  name: string;
  price: number;
  requestDate: Date;
  lastUpdate: Date;
  client: IClient;
  type:IType;
  status:IStatus;
  localization:ILocalization;
  properties: IProperty[];
  materials:IMaterial[];
}
