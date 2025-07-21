export default function Filters({ busca, setBusca, linhas, setLinhas, orderByType, setOrderByType }) {
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
          value={linhas}
          onChange={(e) => setLinhas(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map(num => (
            <option key={num} value={num}>{num} por página</option>
          ))}
        </select>
      </div>
      <div className="col-md-4 mb-2">
        <select
          className="form-select"
          value={orderByType}
          onChange={(e) => setOrderByType(e.target.value)}
        >
          <option value="asc">Mais antigo</option>
          <option value="desc">Mais recente</option>
        </select>
      </div>
    </div>
  )
}
