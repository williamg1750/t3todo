"use server";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { todo } from "~/server/db/schema";
import { Input } from "~/components/ui/input";
import { Button } from "./ui/button";

const AddTodo = () => {
  async function createTodo(formData: FormData) {
    "use server";
    const textFormData = formData.get("text");
    await db.insert(todo).values({ text: textFormData });
    revalidatePath("/todos");
  }

  return (
    <div>
      <form action={createTodo} className="flex flex-row gap-2 p-4">
        <Input type="text" name="text" />
        <Button type="submit">Add To Do</Button>
      </form>
    </div>
  );
};

export default AddTodo;
