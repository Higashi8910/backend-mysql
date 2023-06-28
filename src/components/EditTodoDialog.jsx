import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import godImage from "/project/todo-fire/src/components/godImage.png";
import { useForm } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import "react-datepicker/dist/react-datepicker.css";

export const EditTodoDialog = (props) => {
  // const [dialogText, setDialogText] = useState(props.initialText);
  // useEffect(() => {
  //   setDialogText(props.initialText);
  // }, [props.initialText]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // const [priority, setPriority] = useState("小");
  const [count, setCount] = useState(0);
  const [showImage, setShowImage] = useState(false);

  const maxLength = 20;
  const priorityOptions = [
    { value: "小", label: "小" },
    { value: "中", label: "中" },
    { value: "大", label: "大" }
  ];
  const [selectedPriority, setSelectedPriority] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    setError
  } = useForm();

  const onSubmit = (data) => {
    if (startDate > endDate) {
      setError("endDate", { type: "invalid" });
      return;
    }

    if (
      !props.initialTodo &&
      data.existingTodoTexts.includes(data.dialogText)
    ) {
      setError("dialogText", { type: "duplicate" });
      return;
    }

    if (!selectedPriority) {
      setError("priority", { type: "required" });
      return;
    }

    if (!startDate) {
      setError("startDate", { type: "required" });
      return;
    }

    if (!endDate) {
      setError("endDate", { type: "required" });
      return;
    }

    if (data.dialogText === "god") {
      setShowImage(true);
      return;
    }

    if (props.initialTodo) {
      // 編集モードの場合
      props.onSubmit(
        data.dialogText,
        startDate,
        endDate,
        selectedPriority.value,
        props.initialTodo.id
      );
    } else {
      // 追加モードの場合
      props.onClick(
        data.dialogText,
        startDate,
        endDate,
        selectedPriority.value
      );
    }
    props.onClose();
  };

  // const onChangeDialogText = (event) => setDialogText(event.target.value);

  // const onClickDialogAdd = () => {
  //   if (dialogText === "god") {
  //     setCount(count + 1);
  //     if (count + 1 >= 10) {
  //       setShowImage(true);
  //     }
  //     return;
  //   }
  //   props.onClick(dialogText, startDate, endDate, priority);
  //   setDialogText("");
  //   props.onClose();
  // };

  useEffect(() => {
    register("startDate", { required: true });
    register("endDate", { required: true });
    register("priority", { required: true });
  }, [register]);

  useEffect(() => {
    if (props.incompleteTodos) {
      const todoTexts = props.incompleteTodos.map((todo) => todo.title);
      setValue("existingTodoTexts", todoTexts);
    }
  }, [props.incompleteTodos, setValue]);

  useEffect(() => {
    setValue("startDate", startDate);
    setValue("endDate", endDate);
    setValue("priority", selectedPriority);
  }, [startDate, endDate, selectedPriority, setValue]);

  useEffect(() => {
    if (props.initialTodo) {
      setStartDate(new Date(props.initialTodo.startDate));
      setEndDate(new Date(props.initialTodo.endDate));
      const initialPriorityOption = priorityOptions.find(
        (option) => option.value === props.initialTodo.priority
      );

      if (initialPriorityOption) {
        setSelectedPriority(initialPriorityOption);
      } else {
        setSelectedPriority({
          value: props.initialTodo.priority,
          label: props.initialTodo.priority
        });
      }
    }
  }, [props.initialTodo]);

  return (
    <div className="dialog">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="TODOを入力"
          {...register("dialogText", { required: true, maxLength: maxLength })}
          defaultValue={
            props.initialTodo ? props.initialTodo.title : props.initialText
          }
        />
        {errors &&
          errors.dialogText &&
          errors.dialogText.type === "required" && (
            <p style={{ color: "red" }}>入力が必要です。</p>
          )}
        {errors &&
          errors.dialogText &&
          errors.dialogText.type === "maxLength" && (
            <p style={{ color: "red" }}>入力は20字以内でお願いします。</p>
          )}
        {errors &&
          errors.dialogText &&
          errors.dialogText.type === "duplicate" && (
            <p style={{ color: "red" }}>このTodoは既に存在します。</p>
          )}
        <div>
          <label>開始日：</label>
          <DatePicker
            selected={startDate}
            maxDate={endDate}
            onChange={(date) => {
              setStartDate(date);
              setValue("startDate", date);
            }}
          />
          {errors &&
            errors.startDate &&
            errors.startDate.type === "required" && (
              <p style={{ color: "red" }}>開始日を選択してください。</p>
            )}
        </div>
        <div>
          <label>終了日：</label>
          <DatePicker
            selected={endDate}
            minDate={startDate}
            onChange={(date) => {
              setEndDate(date);
              setValue("endDate", date);
            }}
          />
          {errors && errors.endDate && errors.endDate.type === "required" && (
            <p style={{ color: "red" }}>終了日を選択してください。</p>
          )}
        </div>
        {errors && errors.endDate && errors.endDate.type === "invalid" && (
          <p style={{ color: "red" }}>
            終了日は開始日以降の日付を選択してください。
          </p>
        )}
        <div>
          <label>優先度：</label>
          <CreatableSelect
            options={priorityOptions}
            value={selectedPriority}
            onChange={(option) => {
              setSelectedPriority(option);
              setValue("priority", option ? option.value : null);
            }}
          />
        </div>
        {errors && errors.priority && errors.priority.type === "required" && (
          <p style={{ color: "red" }}>優先度を選択してください。</p>
        )}
        <button type="submit">{props.initialTodo ? "変更" : "追加"}</button>
        <button type="button" onClick={props.onClose}>
          キャンセル
        </button>
      </form>
      {showImage && <img src={godImage} alt="God Image" />}
    </div>
  );
};
