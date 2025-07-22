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
            const response = await fetchViagens(params);

            if (!response || !Array.isArray(response.data?.data)) {
                throw new Error("Resposta inválida da API");
            }

            const listaViagens = response.data.data;
            const total = response.data.total || 0;

            setViagens(listaViagens);
            setTotalPaginas(Math.ceil(total / linhas));
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

            <Table viagens={viagens} erro={erro} loading={loading} />

            <Pagination
                pagina={pagina}
                setPagina={setPagina}
                totalPaginas={totalPaginas}
            />
        </div>
    );
}

export default App;
