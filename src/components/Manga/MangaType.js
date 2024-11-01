import React, { useState } from "react";

const MangaType = ({ selectedType, onTypeChange }) => {
  const [isOpen, setIsOpen] = useState(false); // Untuk membuka atau menutup dropdown

  const option = [
    { id: "newest", name: "Newest" },
    { id: "latest", name: "Latest" },
    { id: "topview", name: "Top read" }
  ];

  return (
    <div className=" relative w-full lg:w-[150px]">
      <div
        className="p-2 rounded-lg bg-[#2e236c] font-semibold text-white cursor-pointer lg:text-center whitespace-nowrap"
        onClick={() => setIsOpen(!isOpen)}
      >
        {option.find((opt) => opt.id === selectedType)?.name || "Select Type"}
      </div>

      {isOpen && (
        <ul className="absolute w-full bg-[#2e236c] mt-2 rounded-lg shadow-lg z-10">
          {option.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                onTypeChange(item.id);
                setIsOpen(false); // Menutup dropdown setelah memilih
              }}
              className="p-2 cursor-pointer hover:bg-white/40 text-white"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MangaType;
