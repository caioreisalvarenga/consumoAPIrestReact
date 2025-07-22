import './Table.css';

export interface Viagem {
  id: string;
  idMunicipioOrigem: string | null;
  idMunicipioDestino: string | null;
  dataCriacao: string;
  numViagem: number;
}

interface TableProps {
  viagens: Viagem[];
  erro: string | null;
  loading: boolean;
}

export default function Table({ viagens, erro, loading }: TableProps) {
  if (loading) {
    return (
      <div className="text-center my-4">
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td colSpan={4}>Carregando...</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="alert alert-danger" role="alert">
        {erro}
      </div>
    );
  }

  if (viagens.length === 0) {
    return (
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td colSpan={4}>Nenhuma viagem encontrada</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table className="table table-bordered">
      <thead className="table-light">
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Origem</th>
          <th>Destino</th>
          <th>Data Criação</th>
        </tr>
      </thead>
      <tbody>
        {viagens.map((viagem, _index) => (
          <tr key={viagem.id}>
            <td>{viagem.numViagem}</td>
            <td>{viagem.id}</td>
            <td>{viagem.idMunicipioOrigem ?? "–"}</td>
            <td>{viagem.idMunicipioDestino ?? "–"}</td>
            <td>{new Date(viagem.dataCriacao).toLocaleString("pt-BR")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
