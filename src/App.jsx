import React, { useEffect, useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc
} from "firebase/firestore";
import TodoGraph from "./TodoGraph";

import db from "./firebase";

export const App = ({
  completeTodos,
  incompleteTodos,
  setCompleteTodos,
  setIncompleteTodos,
  showGraph = true
}) => {
  // const { showGraph = false } = props;
  //const [変数名, 変数に値を設定する関数]
  const [todoText, setTodoText] = useState("");
  // const [incompleteTodos, setIncompleteTodos] = useState([]);
  // const [completeTodos, setCompleteTodos] = useState([]);

  // useEffect(() => {
  //   const getTodosFromFirestore = async () => {
  //     const todoCollection = collection(db, "todos");
  //     const todoSnapshot = await getDocs(todoCollection);
  //     const todoList = todoSnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setIncompleteTodos(todoList.filter((todo) => !todo.complete));
  //     setCompleteTodos(todoList.filter((todo) => todo.complete));
  //   };

  //   getTodosFromFirestore();
  // }, []);

  //入力した値が変化したときにリアルタイムでテキストボックスに代入する用
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = async (text, startDate, endDate, priority) => {
    if (text === "") return;
    const newTodo = {
      title: text,
      complete: false,
      startDate: startDate.toISOString().substring(0, 10),
      endDate: endDate.toISOString().substring(0, 10),
      priority: priority
    };
    await addDoc(collection(db, "todos"), newTodo);
    const todoSnapshot = await getDocs(collection(db, "todos"));
    const todoList = todoSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
    setIncompleteTodos(todoList.filter((todo) => !todo.complete));
    setCompleteTodos(todoList.filter((todo) => todo.complete));
  };

  const onUpdateTodo = async (
    id,
    updatedText,
    startDate,
    endDate,
    priority
  ) => {
    console.log(updatedText);
    console.log(startDate);
    console.log(endDate);
    console.log(priority);
    const updateData = {
      title: updatedText
    };

    if (startDate && endDate) {
      updateData.startDate = startDate.toISOString().substring(0, 10);
      updateData.endDate = endDate.toISOString().substring(0, 10);
    }

    if (priority) {
      updateData.priority = priority;
    }

    await updateDoc(doc(db, "todos", id), updateData);

    const todoSnapshot = await getDocs(collection(db, "todos"));
    const todoList = todoSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
    setIncompleteTodos(todoList.filter((todo) => !todo.complete));
    setCompleteTodos(todoList.filter((todo) => todo.complete));
  };

  const onClickDelete = async (todo) => {
    const todoId = todo.id;
    await deleteDoc(doc(db, "todos", todoId));
    const newIncompleteTodos = incompleteTodos.filter(
      (incompleteTodo) => incompleteTodo.id !== todoId
    );
    const newCompleteTodos = completeTodos.filter(
      (completeTodo) => completeTodo.id !== todoId
    );
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickComplete = async (todo) => {
    const todoId = todo.id;
    await updateDoc(doc(db, "todos", todoId), { complete: true });
    const newIncompleteTodos = incompleteTodos.filter(
      (incompleteTodo) => incompleteTodo.id !== todoId
    );
    todo.complete = true;
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos([...completeTodos, todo]);
  };

  const onClickBack = async (todo) => {
    const todoId = todo.id;
    await updateDoc(doc(db, "todos", todoId), { complete: false });
    const newCompleteTodos = completeTodos.filter(
      (completeTodo) => completeTodo.id !== todoId
    );
    todo.complete = false;
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos([...incompleteTodos, todo]);
  };

  return (
    <>
      <h1>TODOリスト</h1>
      <p> TODOリストの編集</p>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
        setTodoText={setTodoText}
        incompleteTodos={incompleteTodos}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録ができるtodoは5個までです。</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
        onUpdateTodo={onUpdateTodo}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
      {/* {showGraph && (
        <TodoGraph
          completeTodos={completeTodos || []}
          incompleteTodos={incompleteTodos || []}
        />
      )} */}
    </>
  );
};
