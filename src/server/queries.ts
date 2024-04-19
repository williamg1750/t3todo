import "server-only";
import { db } from "./db";
// import { auth } from "@clerk/nextjs/server";
import { todo } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getTodos() {
  const todos = await db.query.todo.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  console.log("todos", todos);
  return todos;
}
