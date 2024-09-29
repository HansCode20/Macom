import React, {useState} from 'react'
const MangaState = ({ selectedState, onStateChange }) => {
    const [isOpen, setIsOpen] = useState(false); // Untuk membuka atau menutup dropdown

    const option = [ 
            { id : "all", name: "ALL" },
            { id: "Completed", name: "Completed" },
            { id: "Ongoing", name: "Ongoing" },
            { id: "drop", name: "Dropped" },
            { id: "unknown", name: "Unknown"}
    ]


  return (
    <div>
         <div className="relative w-[110px] md:w-40 lg:w-[150px]">
      <div
        className="p-2 rounded-lg bg-[#2e236c] font-semibold text-white cursor-pointer text-center whitespace-nowrap"
        onClick={() => setIsOpen(!isOpen)}
      >
        {option.find((opt) => opt.id === selectedState)?.name || "Select state"}
      </div>

      {isOpen && (
        <ul className="absolute w-full bg-[#2e236c] mt-2 rounded-lg shadow-lg z-10">
          {option.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                onStateChange(item.id);
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
    </div>
  )
}

export default MangaState