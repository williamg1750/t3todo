"use server";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { todo } from "~/server/db/schema";
import { Button } from "./ui/button";
import { auth } from "@clerk/nextjs/server";

const AddTodo = () => {
  async function createTodo(formData: FormData) {
    "use server";
    const user = auth();
    if (!user.userId) throw new Error("Unauthorized");
    ("use server");
    const textFormData = formData.get("text");
    if (typeof textFormData !== "string") {
      throw new Error("Invalid text data");
    }
    await db.insert(todo).values({ text: textFormData, userId: user.userId });
    revalidatePath("/todos");
  }

  return (
    <div className="">
      <form action={createTodo} className="flex flex-row gap-2 p-4">
        <input
          type="text"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          name="text"
        />
        <Button type="submit">Add To Do</Button>
      </form>
    </div>
  );
};

export default AddTodo;
