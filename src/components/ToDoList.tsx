import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Categories,
  categoriesState,
  categoryState,
  toDoSelector,
} from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

interface ICategoryForm {
  newCategory: string;
}

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<ICategoryForm>();
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const handleClick = ({ newCategory }: ICategoryForm) => {
    setCategories([...categories, newCategory]);
    setValue("newCategory", "");
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <h1>new Category</h1>
      <form onSubmit={handleSubmit(handleClick)}>
        <input {...register("newCategory")} placeholder="set new category" />
        <button>+</button>
      </form>
      <hr />
      <select value={category} onInput={onInput}>
        {categories.map((item: string) => (
          <option value={item}>{item}</option>
        ))}
      </select>

      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
