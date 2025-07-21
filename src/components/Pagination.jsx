export default function Pagination({ pagina, setPagina, totalPaginas }) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <button
        onClick={() => setPagina(p => Math.max(p - 1, 1))}
        disabled={pagina === 1}
        className="btn btn-primary"
      >
        Anterior
      </button>
      <span>Página {pagina} de {totalPaginas}</span>
      <button
        onClick={() => setPagina(p => Math.min(p + 1, totalPaginas))}
        disabled={pagina === totalPaginas}
        className="btn btn-primary"
      >
        Próxima
      </button>
    </div>
  )
}
