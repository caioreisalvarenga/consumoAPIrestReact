
interface Viagem {
  id: number;
  origem: string;
  destino: string;
  dataCriacao: string;
}

interface TableProps {
  viagens: Viagem[];
}

export default function Table({ viagens }: TableProps) {
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