import { motion } from "framer-motion";

interface FiltersProps {
  resourceFilter: string;
  setResourceFilter: (val: string) => void;
  dateFilter: string;
  setDateFilter: (val: string) => void;
}

const resources = ["Room A", "Room B", "Room C", "Device A"];

const Filters: React.FC<FiltersProps> = ({
  resourceFilter,
  setResourceFilter,
  dateFilter,
  setDateFilter,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4 mb-8 max-w-xl mx-auto px-2"
    >
      <label className="flex flex-col w-full sm:w-48">
        <span className="mb-1 text-sm font-medium text-gray-700">Resource</span>
        <select
          value={resourceFilter}
          onChange={(e) => setResourceFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        >
          <option value="">All Resources</option>
          {resources.map((res) => (
            <option key={res} value={res}>
              {res}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col w-full sm:w-48">
        <span className="mb-1 text-sm font-medium text-gray-700">Date</span>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="Filter by Date"
        />
      </label>
    </motion.section>
  );
};

export default Filters;
