import axios from 'axios';
export interface Viagem {
  id: number;
  origem: string;
  destino: string;
  dataCriacao: string;
  idMunicipioOrigem: number;
  idMunicipioDestino: number;
  numViagem: string;
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

    console.log('Resposta da API:', response.data); // útil para debug

    const viagens = response.data?.data?.data || [];
    const total = response.data?.data?.total || 0;

    return {
      data: viagens,
      total,
    };
  } catch (err) {
    console.error('Erro ao buscar viagens:', err);
    throw err;
  }
};
