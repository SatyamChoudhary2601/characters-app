import Button from "../Button";
import styles from "./index.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePrevious = () => {
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageButton = (pageNumber: number, isCurrent: boolean) => (
    <Button
      key={pageNumber}
      onClick={() => handlePageClick(pageNumber)}
      disabled={isCurrent}
      style={{
        fontWeight: isCurrent ? "bold" : "normal",
        margin: "0 2px",
      }}
    >
      {pageNumber}
    </Button>
  );

  const renderEllipsis = (key: string) => (
    <span key={key} style={{ padding: "0 10px" }}>
      ...
    </span>
  );

  const renderPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1).map((p) =>
        renderPageButton(p, p === currentPage)
      );
    }

    if (currentPage <= 4) {
      const pages = [1, 2, 3, 4, 5];
      return [
        ...pages.map((p) => renderPageButton(p, p === currentPage)),
        renderEllipsis("right-ellipsis"),
        renderPageButton(totalPages, totalPages === currentPage),
      ];
    }

    if (currentPage > totalPages - 4) {
      const pages = [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
      return [
        renderPageButton(1, 1 === currentPage),
        renderEllipsis("left-ellipsis"),
        ...pages.map((p) => renderPageButton(p, p === currentPage)),
      ];
    }

    const pages = [currentPage - 1, currentPage, currentPage + 1];
    return [
      renderPageButton(1, false),
      renderEllipsis("left-ellipsis"),
      ...pages.map((p) => renderPageButton(p, p === currentPage)),
      renderEllipsis("right-ellipsis"),
      renderPageButton(totalPages, false),
    ];
  };

  return (
    <div className={styles.pagination}>
      <Button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </Button>
      {renderPageNumbers()}
      <Button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
