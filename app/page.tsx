import TodoList from "@/components/TodoList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center h-screen justify-center align-middle flex-col w-screen font-[family-name:var(--font-geist-sans)]">
      <TodoList></TodoList>
    </div>
  );
}
