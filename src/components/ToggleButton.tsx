// ToggleButton.tsx
"use server";
import { Button } from "./ui/button";
import { db } from "~/server/db";
import { todo } from "~/server/db/schema";
import { revalidatePath } from "next/cache";
import { not, eq } from "drizzle-orm";

interface ToggleButtonProps {
  id: number;
}

export default async function ToggleButton({ id }: ToggleButtonProps) {
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
      <input type="hidden" name="id" value={id} />
      <Button type="submit">toggle</Button>
    </form>
  );
}
