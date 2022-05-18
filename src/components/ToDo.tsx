import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  Categories,
  categoriesState,
  categoryState,
  IToDo,
  toDoState,
} from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {categories
        .filter((item: string) => item !== category)
        .map((item: string) => (
          <button key={id} name={item} onClick={onClick}>
            {item}
          </button>
        ))}
    </li>
  );
}

export default ToDo;
