import "server-only";
import { db } from "./db";
// import { auth } from "@clerk/nextjs/server";
import { todos } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getTodos() {
  // const user = auth();

  // if (!user.userId) throw new Error("Unauthorized");

  const todos = await db.query.todos.findMany({
    // where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return todos;
}

export async function createTodo(formData: FormData) {
  const task = formData.get("task");
  // const details = formData.get("details") as string;
  // const remindMe = formData.get("remindMe")
  // const urgency = formData.get("urgency")

  // await db.query.todos.insert.values({ task });

  console.log("task", task);
  revalidatePath("/todos");
}
