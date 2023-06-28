import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">トップページ</NavLink>
          </li>
          <li>
            <NavLink to="/todos">ToDoリスト</NavLink>
          </li>
          <li>
            <NavLink to="/graph">ToDo進捗度</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
