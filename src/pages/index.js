import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <h1 className="ml-[250px] p-8 text-3xl font-bold">Server Project</h1>
    </div>
  );
}
