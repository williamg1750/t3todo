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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </form>
  );
}
