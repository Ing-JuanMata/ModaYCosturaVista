export interface IClient {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  isAdmin: boolean;
  lastUpdate: string;
  isActive: boolean;
  jobs?: number;
}
