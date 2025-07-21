
interface FiltersProps {
  busca: string;
  setBusca: (value: string) => void;
  linhas: number;
  setLinhas: (value: number) => void;
  orderByType: 'asc' | 'desc';
  setOrderByType: (value: 'asc' | 'desc') => void;
}

export default function Filters({
  busca,
  setBusca,
  linhas,
  setLinhas,
  orderByType,
  setOrderByType,
}: FiltersProps) {
  return (
    <div className="row mb-4">
      <div className="col-md-4 mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>
      <div className="col-md-4 mb-2">
        <select
          className="form-select"
          value={linhas.toString()}
          onChange={(e) => setLinhas(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map((num) => (
            <option key={num} value={num.toString()}>{num} por página</option>
          ))}
        </select>
      </div>
      <div className="col-md-4 mb-2">
        <select
          className="form-select"
          value={orderByType}
          onChange={(e) => {
            const value = e.target.value;
            if (value === 'asc' || value === 'desc') {
              setOrderByType(value);
            }
          }}
        >
          <option value="asc">Mais antigo</option>
          <option value="desc">Mais recente</option>
        </select>
      </div>
    </div>
  );
}