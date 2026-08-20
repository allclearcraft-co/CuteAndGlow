import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ pagination, filters, setFilters }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { page, totalPages, hasNext, hasPrev } = pagination;

  const changePage = (pageNo) => {
    if (pageNo < 1 || pageNo > totalPages) return;

    setFilters((prev) => ({
      ...prev,
      page: pageNo,
    }));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    if (page <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (page >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-12">
      {/* Information */}

      <div className="text-sm text-neutral-500">
        Showing page <span className="font-semibold">{page}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </div>

      {/* Pagination */}

      <div className="flex items-center gap-2 flex-wrap justify-center">
        {/* Previous */}

        <button
          onClick={() => changePage(page - 1)}
          disabled={!hasPrev}
          className={`h-10 w-10 rounded-lg flex justify-center items-center transition
          ${
            hasPrev
              ? "bg-white border hover:bg-pink-500 hover:text-white"
              : "bg-neutral-200 cursor-not-allowed"
          }`}
        >
          <FaChevronLeft />
        </button>

        {getPageNumbers().map((item, index) =>
          item === "..." ? (
            <span key={index} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => changePage(item)}
              className={`h-10 w-10 rounded-lg transition
              ${
                item === page
                  ? "bg-[#d65f92] text-white"
                  : "bg-white border hover:bg-pink-100"
              }`}
            >
              {item}
            </button>
          ),
        )}

        {/* Next */}

        <button
          onClick={() => changePage(page + 1)}
          disabled={!hasNext}
          className={`h-10 w-10 rounded-lg flex justify-center items-center transition
          ${
            hasNext
              ? "bg-white border hover:bg-pink-500 hover:text-white"
              : "bg-neutral-200 cursor-not-allowed"
          }`}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
