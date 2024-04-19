// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `t3_todo_${name}`);

// export const posts = createTable(
//   "post",
//   {
//     id: serial("id").primaryKey(),
//     name: varchar("name", { length: 256 }),
//     createdAt: timestamp("created_at")
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updatedAt"),
//   },
//   (example) => ({
//     nameIndex: index("name_idx").on(example.name),
//   })
// );

export const todos = createTable(
  "todo",
  {
    id: serial("id").primaryKey(),
    task: varchar("name", { length: 150 }),
    // details: varchar("details", { length: 500 }),
    isComplete: boolean("isComplete").default(false),
    // remindMe: boolean("remindMe").default(false),
    // urgency: boolean("urgency").default(false), // low medium high
    //userId: need to set up clerk
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    taskIndex: index("task_idx").on(example.task),
  }),
);
