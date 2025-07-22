interface PaginationProps {
  pagina: number;
  setPagina: (pagina: number | ((prevPagina: number) => number)) => void;
  totalPaginas: number;
}

export default function Pagination({
  pagina,
  setPagina,
  totalPaginas,
}: PaginationProps) {
  const irParaAnterior = () => {
    setPagina((prev) => Math.max(prev - 1, 1));
  };

  const irParaProxima = () => {
    setPagina((prev) => Math.min(prev + 1, totalPaginas));
  };

  return (
    <nav
      className="d-flex justify-content-between align-items-center mt-4"
      aria-label="Navegação de páginas"
    >
      <button
        onClick={irParaAnterior}
        disabled={pagina === 1}
        className="btn btn-outline-primary"
        aria-label="Página anterior"
      >
        ← Anterior
      </button>

      <span className="fw-bold">
        Página {pagina} de {totalPaginas}
      </span>

      <button
        onClick={irParaProxima}
        disabled={pagina === totalPaginas}
        className="btn btn-outline-primary"
        aria-label="Próxima página"
      >
        Próxima →
      </button>
    </nav>
  );
}
