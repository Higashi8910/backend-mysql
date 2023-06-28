import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import godImage from "/project/todo-fire/src/components/godImage.png";
import { useForm } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { EditTodoDialog } from "/project/todo-fire/src/components/EditTodoDialog";

import "react-datepicker/dist/react-datepicker.css";

const style = {
  backgroundColor: "#c1ffff",
  width: "800px",
  height: "30px",
  borderRadius: "8px",
  padding: "8px",
  margin: "8px"
};

const inputStyle = {
  width: "87%" // ここで入力ボックスの幅を設定
};

export const InputTodo = (props) => {
  const { todoText, setTodoText, onClick, disabled, incompleteTodos } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const onClickAdd = (text, startDate, endDate, priority) => {
    props.onClick(text, startDate, endDate, priority);
    props.setTodoText("");
    setDialogOpen(false);
  };

  return (
    <div style={style}>
      {dialogOpen && (
        <EditTodoDialog
          onClick={onClickAdd}
          onClose={() => setDialogOpen(false)}
          initialText={todoText}
          incompleteTodos={incompleteTodos}
        />
      )}
      <input
        disabled={disabled}
        placeholder="TODOを入力"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        style={inputStyle}
      />
      {!dialogOpen && (
        <button
          disabled={disabled || !todoText}
          onClick={() => setDialogOpen(true)}
        >
          追加
        </button>
      )}
    </div>
  );
};
