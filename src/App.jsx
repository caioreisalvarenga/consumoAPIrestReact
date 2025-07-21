import { useEffect, useState } from "react"
import { fetchViagens } from "./services/api"
import Table from "./components/Table"
import Filters from "./components/Filters"
import Pagination from "./components/Pagination"

function App() {
  const [viagens, setViagens] = useState([])
  const [pagina, setPagina] = useState(1)
  const [linhas, setLinhas] = useState(10)
  const [busca, setBusca] = useState("")
  const [orderBy] = useState("dataCriacao")
  const [orderByType, setOrderByType] = useState("desc")
  const [totalPaginas, setTotalPaginas] = useState(1)

  const loadData = async () => {
    const params = { pagina, linhas, busca, orderBy, orderByType }
    try {
      const data = await fetchViagens(params)
      setViagens(data.data || [])
      setTotalPaginas(data.totalPaginas || 1)
    } catch (err) {
      console.error("Erro ao buscar viagens:", err)
    }
  }

  useEffect(() => {
    loadData()
  }, [pagina, linhas, busca, orderByType])

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
      <Table viagens={viagens} />
      <Pagination pagina={pagina} setPagina={setPagina} totalPaginas={totalPaginas} />
    </div>
  )
}

export default App
