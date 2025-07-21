import { useEffect, useState, useCallback } from "react";
import { fetchViagens, type Viagem } from "./services/api";
import Table from "./components/Table";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";

function App() {
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [pagina, setPagina] = useState(1);
  const [linhas, setLinhas] = useState(10);
  const [busca, setBusca] = useState("");
  const [orderBy] = useState<"dataCriacao">("dataCriacao");
  const [orderByType, setOrderByType] = useState<"asc" | "desc">("desc");
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    const params = { pagina, linhas, busca, orderBy, orderByType };

    try {
      setLoading(true);
      const data = await fetchViagens(params);

      if (!data || !Array.isArray(data.data)) {
        throw new Error("Resposta inválida da API");
      }

      setViagens(data.data);
      setTotalPaginas(data.totalPaginas ?? 1);
      setErro(null);
    } catch (err) {
      console.error(err);
      setErro("Erro ao buscar viagens");
    } finally {
      setLoading(false);
    }
  }, [pagina, linhas, busca, orderBy, orderByType]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Lista de Viagens</h1>

      <Filters
        busca={busca}
        setBusca={setBusca}
        linhas={linhas}
        setLinhas={setLinhas}
        orderByType={orderByType}
        setOrderByType={setOrderByType}
      />

      {erro && (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      )}

      {loading ? (
        <div className="text-center my-4">Carregando...</div>
      ) : (
        <>
          <Table viagens={viagens} />

          <Pagination
            pagina={pagina}
            setPagina={setPagina}
            totalPaginas={totalPaginas}
          />
        </>
      )}
    </div>
  );
}

export default App;
