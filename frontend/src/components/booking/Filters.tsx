import React from "react";

interface FiltersProps {
  resourceFilter: string;
  setResourceFilter: (val: string) => void;
  dateFilter: string;
  setDateFilter: (val: string) => void;
}

const resources = ["Room A", "Room B", "Projector", "Laptop", "Whiteboard"];

const Filters: React.FC<FiltersProps> = ({
  resourceFilter,
  setResourceFilter,
  dateFilter,
  setDateFilter,
}) => {
  return (
    <section className="flex flex-col sm:flex-row gap-4 mb-6 justify-center items-center">
      <select
        value={resourceFilter}
        onChange={(e) => setResourceFilter(e.target.value)}
        className="border rounded-md px-3 py-2 w-full sm:w-48"
      >
        <option value="">All Resources</option>
        {resources.map((res) => (
          <option key={res} value={res}>
            {res}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className="border rounded-md px-3 py-2 w-full sm:w-48"
        placeholder="Filter by Date"
      />
    </section>
  );
};

export default Filters;
