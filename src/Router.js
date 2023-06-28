import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { App } from "./App";
import TodoGraph from "./TodoGraph";
import { Sidebar } from "./components/Sidebar";
import Top from "./Top";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { collection, getDocs } from "firebase/firestore";
import db from "./firebase";

export const Router = () => {
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  useEffect(() => {
    const getTodosFromFirestore = async () => {
      const todoCollection = collection(db, "todos");
      const todoSnapshot = await getDocs(todoCollection);
      const todoList = todoSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setIncompleteTodos(todoList.filter((todo) => !todo.complete));
      setCompleteTodos(todoList.filter((todo) => todo.complete));
    };

    getTodosFromFirestore();
  }, []);

  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route
          path="/"
          element={
            <Top
              todos={incompleteTodos}
              setIncompleteTodos={setIncompleteTodos}
            />
          }
        />
        <Route
          path="/todos"
          element={
            <App
              completeTodos={completeTodos}
              incompleteTodos={incompleteTodos}
              setCompleteTodos={setCompleteTodos}
              setIncompleteTodos={setIncompleteTodos}
            />
          }
        />
        <Route
          path="/graph"
          element={
            <TodoGraph
              completeTodos={completeTodos}
              incompleteTodos={incompleteTodos}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
