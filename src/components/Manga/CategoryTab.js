import React from "react";

const CategoryTab = ({ category, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex whitespace-nowrap items-center text-center gap-10 overflow-x-auto w-4/5 lg:w-2/3  pb-2 scrollbar-custom mx-auto">
      {category.map((item) => (
        <button
          key={item.id}
          onClick={() => onCategoryChange(item.id)}
          className={`text-sm font-semibold text-white p-2 ${
            selectedCategory === item.id
              ? "bg-[#2E236C] text-white rounded-lg"
              : ""
          } transition delay-200 duration-200 ease-in-out transform`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryTab;
