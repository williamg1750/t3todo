"use server";
import { Checkbox } from "./ui/checkbox";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { todos } from "~/server/db/schema";
import { Button } from "./ui/button";
import { is, eq, not } from "drizzle-orm";

interface TodoProps {
  todo: {
    id: number;
    task?: string | null;
    isComplete: boolean | null;
    createdAt: Date;
    updatedAt?: Date | null;
  };
}

export default async function Todo({ todo }: TodoProps) {
  const { id, task, isComplete, createdAt, updatedAt } = todo;
  async function toggleTodo(formData: FormData) {
    "use server";
    const id = parseInt(formData.get("id") as string);
    console.log("id", id);
    await db
      .update(todos)
      .set({
        isComplete: not(todo.isComplete) ?? false,
      })
      .where(eq(todos.id, id));

    revalidatePath("/todos");
  }
  return (
    <form action={toggleTodo}>
      <div className="flex items-center gap-2 px-2 py-1">
        <input type="hidden" name="id" value={id} />
        <Button type="submit">toggle</Button>
        <label htmlFor="task" className="text-sm font-medium">
          {task}
        </label>
        <Checkbox checked={isComplete ?? false} />
      </div>
    </form>
  );
}
