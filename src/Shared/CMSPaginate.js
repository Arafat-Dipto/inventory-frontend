import React from 'react';
import ReactPaginate from 'react-paginate';

export default function CMSPaginate({ pageCount, onPageChange, currentPage }) {
  if (!pageCount || parseInt(pageCount) === 0 || parseInt(pageCount) === 1) {
    return null;
  }

  return (
    <div className="flex justify-center my-4">
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        containerClassName="pagination"
        activeClassName="active"
        onPageChange={(v) => {
          const nextPage = v.selected + 1;
          const newURL =
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname +
            `?page=${nextPage}`;
          window.history.pushState({ path: newURL }, 'USB CMS', newURL);
          onPageChange(nextPage);
        }}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        hrefAllControls
        forcePage={currentPage}
      />
    </div>
  );
}
