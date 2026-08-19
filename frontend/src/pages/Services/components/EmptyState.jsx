import { FaSearch } from "react-icons/fa";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <FaSearch className="text-7xl text-neutral-300 mb-5" />

      <h2 className="heading text-3xl mb-2">No Services Found</h2>

      <p className="paragraph text-neutral-500 text-center max-w-lg">
        We couldn't find any services matching your filters. Try changing the
        search, category, or sorting options.
      </p>
    </div>
  );
};

export default EmptyState;
