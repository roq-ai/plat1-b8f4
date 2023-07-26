import { ClientInterface } from 'interfaces/client';
import { GetQueryInterface } from 'interfaces';

export interface LicensePlateInterface {
  id?: string;
  result: string;
  client_id?: string;
  created_at?: any;
  updated_at?: any;

  client?: ClientInterface;
  _count?: {};
}

export interface LicensePlateGetQueryInterface extends GetQueryInterface {
  id?: string;
  result?: string;
  client_id?: string;
}
