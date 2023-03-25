import React from "react";
import { AiFillAlert } from "react-icons/ai";
import { MdOutlineRestartAlt } from "react-icons/md";

export const Navbar: React.FC = () => {

    
  return (
    <nav className="flex items-center justify-between bg-gray-200 p-4">
      <div className="flex items-center">
        <AiFillAlert />
      </div>
      <div className="flex items-center">
        <button
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <MdOutlineRestartAlt />
          <span className="ml-2">Restart Game</span>
        </button>
      </div>
    </nav>
  );
};
