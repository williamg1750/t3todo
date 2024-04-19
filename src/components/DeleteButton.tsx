// ToggleButton.tsx
"use server";
import { Button } from "./ui/button";
import { db } from "~/server/db";
import { todo } from "~/server/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

interface DeleteButtonProps {
  id: number;
}

export default async function DeleteButton({ id }: DeleteButtonProps) {
  async function toggleTodo(formData: FormData) {
    "use server";

    const id = parseInt(formData.get("id") as string);
    await db.delete(todo).where(eq(todo.id, id));

    revalidatePath("/todos");
  }

  return (
    <form action={toggleTodo}>
      <input type="hidden" name="id" value={id} />
      <Button type="submit" variant="destructive">
        Delete
      </Button>
    </form>
  );
}
