"use server";
import ToggleButton from "./ToggleButton";
import DeleteButton from "./DeleteButton";

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
  const { id, text } = todoProps;

  return (
    <div className="flex items-center gap-2 px-2 py-1">
      <ToggleButton id={id} />
      <label htmlFor="task" className="text-sm font-medium">
        {text}
      </label>
      <DeleteButton id={id} />
    </div>
  );
}
