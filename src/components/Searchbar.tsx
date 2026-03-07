
import React from "react";

interface SearchbarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ searchTerm, onSearchChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Searchbar;
