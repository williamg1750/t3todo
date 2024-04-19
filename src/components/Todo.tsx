"use server";
import { Checkbox } from "./ui/checkbox";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { todo } from "~/server/db/schema";
import { Button } from "./ui/button";
import { is, eq, not } from "drizzle-orm";

interface TodoProps {
  todoProps: {
    id: number;
    text: string;
    done: boolean;
    createdAt: Date;
    updatedAt?: Date | null;
  };
}

export default async function Todo({ todoProps }: TodoProps) {
  const { id, text, done, createdAt } = todoProps;
  async function toggleTodo(formData: FormData) {
    "use server";

    const id = parseInt(formData.get("id") as string);
    await db
      .update(todo)
      .set({
        done: not(todo.done),
      })
      .where(eq(todo.id, id));

    revalidatePath("/todos");
  }
  return (
    <form action={toggleTodo}>
      <div className="flex items-center gap-2 px-2 py-1">
        <input type="hidden" name="id" value={id} />
        <Button type="submit">toggle</Button>
        <label htmlFor="task" className="text-sm font-medium">
          {text}
        </label>
        <Checkbox checked={done} />
      </div>
    </form>
  );
}
