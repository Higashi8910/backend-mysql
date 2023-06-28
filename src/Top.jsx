import React, { useEffect } from "react";
import { IncompleteTodos } from "./components/IncompleteTodos";
import db from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const Top = (props) => {
  const { todos, setIncompleteTodos } = props;

  useEffect(() => {
    const getTodosFromFirestore = async () => {
      const todoCollection = collection(db, "todos");
      const todoSnapshot = await getDocs(todoCollection);
      const todoList = todoSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setIncompleteTodos(todoList.filter((todo) => !todo.complete));
    };

    getTodosFromFirestore();
  }, []);

  return (
    <div>
      <h1>トップページ</h1>
      <p> 現在のTODO</p>
      <IncompleteTodos todos={todos} readOnly={true} />
    </div>
  );
};

export default Top;
