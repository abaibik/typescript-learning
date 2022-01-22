// @ts-ignore
import fetch from "node-fetch";

interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function getTodosByCount(count: number) {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then<ToDo[]>((json) => {
      if (!Array.isArray(json)) {
        throw new Error("Not array");
      }
      return json.map((el) => {
        return {
          userId: el.userId,
          id: el.id,
          title: el.title,
          completed: el.completed,
        };
      });
    })
    .then((todos) =>
      todos.slice(0, count).forEach((el) => {
        console.log(
          `#${el.id}: ${el.title} (${
            el.completed ? "completed" : "not completed"
          })`
        );
      })
    );
}

getTodosByCount(10);
