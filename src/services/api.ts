import axios from 'axios';
export interface Viagem {
  id: number;
  origem: string;
  destino: string;
  dataCriacao: string;
}
interface ViagemResponse {
  data: Viagem[];
  total: number;
}

const apiToken = '2f4c6f15-970d-4a8e-aa99-8daaa6801112';

const API = axios.create({
  baseURL: 'https://apislhubclient.dev.slhub.com.br/api/viagem',
  headers: {
    'api-token': apiToken,
  },
});

export const fetchViagens = async (params: any): Promise<ViagemResponse> => {
  try {
    const response = await API.get('', { params });

    return {
      data: response.data?.data || [],
      total: response.data?.total || 0,
    };
  } catch (err) {
    console.error('Erro ao buscar viagens:', err);
    throw err;
  }
};
