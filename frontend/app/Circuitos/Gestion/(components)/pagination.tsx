function PaginationComponent({
    currentPage = 1,
    totalPages = 1,
    handlePrevPage = () => {},
    handleNextPage = () => {},
}) {
    return (
        <div className="w-screen justify-center items-center">
            <div className="flex justify-center items-center mt-4">
                <div className="flex items-center bg-gray-100 rounded-lg w-fit p-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="mr-2"
                    >
                        <svg
                            className="w-2.5 h-2.5 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path stroke="currentColor" d="M5 1 1 5l4 4" />
                        </svg>
                    </button>
                    <span className="px-4">{`Página ${currentPage} de ${totalPages}`}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <svg
                            className="w-2.5 h-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path stroke="currentColor" d="M1 1l4 4-4 4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaginationComponent;
