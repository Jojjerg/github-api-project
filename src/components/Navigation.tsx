import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="flex flex-row justify-between items-center h-[50px] px-5 shadow-md">
      <h3 className="font-bold">Github Search</h3>

      <div className="flex flex-row gap-5">
        <span>
          <Link to="/">Home</Link>
        </span>
        <span>
          <Link to="/favourites">Favourites</Link>
        </span>
      </div>
    </nav>
  );
};

export default Navigation;
