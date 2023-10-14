import React from 'react';

const Pagination = ({ page, onPageChange, hasPrevPage, hasNextPage }) => {
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center my-5">
                <li className="page-item">
                    <button
                        className={`page-link ${!hasPrevPage ? 'disabled' : ''}`}
                        onClick={() => onPageChange('prev')}
                        disabled={!hasPrevPage}
                    >
                        Previous Page
                    </button>
                </li>
                <li className="page-item">
                    <span className="page-link page-number">Page {page}</span>
                </li>
                <li className="page-item">
                    <button
                        className={`page-link ${!hasNextPage ? 'disabled' : ''}`}
                        onClick={() => onPageChange('next')}
                        disabled={!hasNextPage}
                    >
                        Next Page
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;