import axios from 'axios';
import queryString from 'query-string';
import { LicensePlateInterface, LicensePlateGetQueryInterface } from 'interfaces/license-plate';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getLicensePlates = async (
  query?: LicensePlateGetQueryInterface,
): Promise<PaginatedInterface<LicensePlateInterface>> => {
  const response = await axios.get('/api/license-plates', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createLicensePlate = async (licensePlate: LicensePlateInterface) => {
  const response = await axios.post('/api/license-plates', licensePlate);
  return response.data;
};

export const updateLicensePlateById = async (id: string, licensePlate: LicensePlateInterface) => {
  const response = await axios.put(`/api/license-plates/${id}`, licensePlate);
  return response.data;
};

export const getLicensePlateById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/license-plates/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLicensePlateById = async (id: string) => {
  const response = await axios.delete(`/api/license-plates/${id}`);
  return response.data;
};
