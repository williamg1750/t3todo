"use server";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { todos } from "~/server/db/schema";
import { Input } from "~/components/ui/input";
import { Button } from "./ui/button";

const AddTodo = () => {
  async function createTodo(formData: FormData) {
    "use server";
    const task = formData.get("task");
    await db.insert(todos).values({ task: task });
    console.log("task---------", task);
    revalidatePath("/todos");
  }

  return (
    <div>
      <form action={createTodo} className="flex flex-row gap-2 p-4">
        <Input type="text" name="task" />
        <Button type="submit">Add To Do</Button>
      </form>
    </div>
  );
};

export default AddTodo;
