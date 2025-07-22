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

/**
 * Função para buscar viagens com filtros, paginação e ordenação
 * @param params Objeto com os filtros: pagina, linhas, busca, orderBy, orderByType
 * @param signal AbortSignal para cancelar a requisição se necessário
 */
export const fetchViagens = async (
  params: {
    pagina: number;
    linhas: number;
    busca: string;
    orderBy: string;
    orderByType: 'asc' | 'desc';
  },
  signal?: AbortSignal
): Promise<ViagemResponse> => {
  try {
    const response = await API.get('', {
      params,
      signal,
    });

    const viagens = response.data?.data?.data || [];
    const total = response.data?.data?.total || 0;

    return {
      data: viagens,
      total,
    };
  } catch (error: any) {
    if (axios.isCancel(error)) {
      console.warn('Requisição cancelada');
    } else {
      console.error('Erro ao buscar viagens:', error);
    }
    throw error;
  }
};
