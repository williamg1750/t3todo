import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          T3<span className="text-[hsl(280,100%,70%)]">Todo</span>
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
            <h3 className="text-2xl font-bold">Simple Todo app</h3>
            <div className="text-lg">Just a todo app with a twist</div>
          </div>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://t3todo-l6gzn41o3-williams-projects-f986bfaa.vercel.app/todos"
          >
            <h3 className="text-2xl font-bold">Get Started →</h3>
            <div className="text-lg">
              Login via Gmail or Discord to get started
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
