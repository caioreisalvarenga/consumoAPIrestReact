import './Table.css';

interface Viagem {
  id: number;
  origem: string;
  destino: string;
  dataCriacao: string;
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
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td colSpan={4}>{erro}</td>
            </tr>
          </tbody>
        </table>
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
          <th>ID</th>
          <th>Origem</th>
          <th>Destino</th>
          <th>Data Criação</th>
        </tr>
      </thead>
      <tbody>
        {viagens.map((viagem) => (
          <tr key={viagem.id}>
            <td>{viagem.id}</td>
            <td>{viagem.origem}</td>
            <td>{viagem.destino}</td>
            <td>{new Date(viagem.dataCriacao).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}