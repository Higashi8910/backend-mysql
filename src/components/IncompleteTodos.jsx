import { useState, useEffect } from "react";
import { EditTodoDialog } from "/project/backend-mysql/src/components/EditTodoDialog";

export const IncompleteTodos = (props) => {
  const { todos, onClickComplete, onClickDelete, readOnly, onUpdateTodo } =
    props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  // 開始日が早い順にソート
  const sortedTodos = todos.slice().sort((a, b) => {
    return new Date(a.startDate) - new Date(b.startDate);
  });

  const onClickEdit = (todo) => {
    setEditingTodo(todo);
    setDialogOpen(true);
  };

  const onDialogClose = () => {
    setDialogOpen(false);
    setEditingTodo(null);
  };

  const onDialogSubmit = (updatedTodo, startDate, endDate, priority) => {
    console.log(editingTodo.id);
    console.log(updatedTodo);
    onUpdateTodo(editingTodo.id, updatedTodo, startDate, endDate, priority);
    onDialogClose();
  };

  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>TODO名</th>
            <th>開始日</th>
            <th>終了日</th>
            <th>優先度</th>
            {!readOnly && <th>操作</th>}
          </tr>
        </thead>
        <tbody>
          {sortedTodos.map((todo, index) => {
            return (
              <tr key={todo.id}>
                <td>{index + 1}</td>
                <td>{todo.title}</td>
                <td>{todo.startDate}</td>
                <td>{todo.endDate}</td>
                <td>{todo.priority}</td>

                {!readOnly && (
                  <>
                    <td>
                      <button onClick={() => onClickComplete(todo)}>
                        完了
                      </button>
                      <button onClick={() => onClickEdit(todo)}>編集</button>
                      <button onClick={() => onClickDelete(todo)}>削除</button>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {dialogOpen && editingTodo && (
        <EditTodoDialog
          onClose={onDialogClose}
          onSubmit={onDialogSubmit}
          initialTodo={editingTodo}
          incompleteTodos={todos}
        />
      )}
    </div>
  );
};
