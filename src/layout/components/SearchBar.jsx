import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";
const SearchBar = ({placeholder, searchTerm, setSearchTerm}) => {
  
  return (
    <div className=" bg-search-input-container-background flex py-3 px-5 items-center gap-3 h-14 custom-scrollbar w-full">
      <div className=" bg-panel-header-background flex items-center gap-2 px-3 py-1 rounded-lg flex-grow ">
        <div className=" 800px:px-2 px-0"> 
          <BiSearchAlt2 className=" text-lg cursor-pointer" />
        </div>
        <div className=" w-full ">
          <input
            type="text"
            placeholder={placeholder}
            className=" outline-none bg-transparent text-white w-full "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className=" 800px:pr-5 pr-0 pl-3 ">
        <BsFilter className=" text-xl cursor-pointer " title="Filter" />
      </div>
    </div>
  );
};

export default SearchBar;
