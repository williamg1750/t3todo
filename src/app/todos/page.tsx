import { getTodos } from "~/server/queries";
import Todo from "~/components/Todo";
import AddTodo from "~/components/AddTodo";
import { Card } from "~/components/ui/card";

const todosPage = async () => {
  const todos = await getTodos();
  return (
    <div>
      <AddTodo />
      <div className="flew-row flex">
        <div className="flex flex-row p-4">
          <Card>
            {todos
              .filter((t) => t.done === false)
              .map((todo) => (
                <Todo key={todo.id} todoProps={todo} />
              ))}
          </Card>
        </div>
        <div className="flex flex-row p-4">
          <Card>
            {todos
              .filter((t) => t.done)
              .map((todo) => (
                <Todo key={todo.id} todoProps={todo} />
              ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default todosPage;
