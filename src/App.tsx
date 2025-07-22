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
    const [orderByType, setOrderByType] = useState<"asc" | "desc">("desc");
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [erro, setErro] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Atualiza a página para 1 ao buscar novo termo
    useEffect(() => {
        setPagina(1);
    }, [busca]);

    // Atualiza a página para 1 ao mudar quantidade de linhas
    useEffect(() => {
        setPagina(1);
    }, [linhas]);

    const loadData = useCallback(() => {
        const controller = new AbortController();
        const params = {
            pagina,
            linhas,
            busca,
            orderBy: "dataCriacao",
            orderByType
        };

        setLoading(true);

        fetchViagens(params, controller.signal)
            .then((response) => {
                if (!response || !Array.isArray(response.data)) {
                    throw new Error("Resposta inválida da API");
                }

                const listaViagens = response.data;
                const total = response.total || 0;

                setViagens(listaViagens);
                setTotalPaginas(Math.max(1, Math.ceil(total / linhas)));
                setErro(null);
            })
            .catch((err) => {
                if (err.name !== "CanceledError") {
                    console.error(err);
                    setErro("Erro ao buscar viagens");
                }
            })
            .finally(() => {
                setLoading(false);
            });

        return () => controller.abort();
    }, [pagina, linhas, busca, orderByType]);

    useEffect(() => {
        const abort = loadData();
        return abort;
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
