export interface IClient {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  isAdmin: boolean;
  jobs?: number;
}
