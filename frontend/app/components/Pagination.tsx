import React from "react";
import _ from "lodash";

type PaginationProps = {
    items: number;
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
    items,
    pageSize,
    currentPage,
    onPageChange,
}) => {
    const pageCount = Math.ceil(items / pageSize);

    if (pageCount === 1) return null;

    const pages = _.range(1, pageCount + 1);

    return (
        <>
            <nav className="mt-4">
                <ul className="inline-flex -space-x-px text-sm">
                    {pages.map((page) => (
                        <li
                            key={page}
                            className={
                                page === currentPage ? "bg-red-500" : "bg-white"
                            }
                        >
                            <a
                                style={{ cursor: "pointer" }}
                                onClick={() => onPageChange(page)}
                                className={
                                    page === currentPage
                                        ? "inline-flex items-center px-4 py-2 border border-gray-300 bg-red-500 text-sm font-medium text-gray-100 hover:bg-red-600"
                                        : "inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                }
                            >
                                {page}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
