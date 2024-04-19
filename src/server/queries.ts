import "server-only";
import { db } from "./db";
// import { auth } from "@clerk/nextjs/server";
import { todo } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function getTodos() {
  const user = auth();
  console.log("user", user);
  if (!user.userId) throw new Error("Unauthorized");
  const todos = await db.query.todo.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  console.log("todos", todos);
  return todos;
}
