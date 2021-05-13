import { apiClient } from 'app/services/client';
import ApiConfig from 'app/config/api-config';

export default function loginUser(username: string, password: string) {
  return apiClient.get(ApiConfig.quranList, { username, password });
}

export function quranDetails(id: number) {
  return apiClient.get(ApiConfig.quranDetails({ id }));
}
