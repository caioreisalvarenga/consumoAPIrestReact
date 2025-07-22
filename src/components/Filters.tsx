import { useState, useEffect } from 'react';
import './Filters.css';

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
  // Estado local para input de busca (debounce)
  const [searchTerm, setSearchTerm] = useState(busca);

  // Atualiza o searchTerm local quando a prop busca externa muda (ex: reset)
  useEffect(() => {
    setSearchTerm(busca);
  }, [busca]);

  // Debounce: atualiza o filtro global (setBusca) 500ms após o usuário parar de digitar
  useEffect(() => {
    const handler = setTimeout(() => {
      setBusca(searchTerm.trim());
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, setBusca]);

  return (
    <div className="filters d-flex gap-3 flex-wrap mb-4">
      <div className="filter-item">
        <label htmlFor="busca" className="form-label">
          Buscar
        </label>
        <input
          id="busca"
          type="text"
          className="form-control"
          placeholder="Buscar por ID, número da viagem, origem, destino ou data/hora..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="filter-item">
        <label htmlFor="linhas" className="form-label">
          Linhas por página
        </label>
        <select
          id="linhas"
          className="form-select"
          value={linhas}
          onChange={(e) => setLinhas(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map((num) => (
            <option key={num} value={num}>
              {num} por página
            </option>
          ))}
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="ordenacao" className="form-label">
          Ordenar por
        </label>
        <select
          id="ordenacao"
          className="form-select"
          value={orderByType}
          onChange={(e) => setOrderByType(e.target.value as 'asc' | 'desc')}
        >
          <option value="asc">Mais antigo</option>
          <option value="desc">Mais recente</option>
        </select>
      </div>
    </div>
  );
}
