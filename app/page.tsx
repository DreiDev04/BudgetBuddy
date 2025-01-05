import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      {/* Main Content (Header, Sidebar, Section) */}
      <div className="flex-grow sm:grid sm:grid-cols-12">
        {/* Sidebar for larger screens */}
        <aside className="hidden sm:flex sm:col-span-2 h-full flex-col justify-between items-center  border-r-2 border-r-zinc-900 bg-slate-100">
          <div>
            <h1 className="text-3xl p-4">BUDGET</h1>
          </div>
          <nav className="flex flex-col gap-4">
            <Button size="lg" className="text-md w-56 dark:border-2 dark:border-zinc-900 shadow-md">Dashboard</Button>
            <Button size="lg" className="text-md w-56 dark:border-2 dark:border-zinc-900 shadow-md">Transaction</Button>
            <Button size="lg" className="text-md w-56 dark:border-2 dark:border-zinc-900 shadow-md">Budget</Button>
            <Button size="lg" className="text-md w-56 dark:border-2 dark:border-zinc-900 shadow-md">Goals</Button>
          </nav>
          <div className="p-4">
            <Button variant="outline" className="text-md w-56 h-16 dark:border dark:border-zinc-900 shadow-md">
              <Plus /> ADD NEW
            </Button>
          </div>
        </aside>

        {/* Main Section */}
        <main className="sm:col-span-10 h-full flex flex-col ">
          {/* Header */}
          <header className=" w-full p-4 flex items-center justify-end border-b-2 border-b-zinc-900 gap-4 bg-tertiary shadow-md">
            <h2 className="text-3xl ">Profile</h2>
            <ModeToggle />
          </header>

          {/* Content Section */}
          <section className="flex-1 bg-slate-200"></section>
        </main>
      </div>

      {/* Footer */}
      <footer className="sm:hidden p-6 flex flex-wrap justify-around items-center border-t-2 border-t-zinc-900 gap-2 ">
        <Button size="icon" className="flex-1 text-xs">
          Dashboard
        </Button>
        <Button size="icon" className="flex-1 text-xs">
          Budget
        </Button>
        <Button size="icon" className="flex-1 text-xs" variant="outline">
          <Plus />
        </Button>
        <Button size="icon" className="flex-1 text-xs">
          Goals
        </Button>
        <Button size="icon" className="flex-1 text-xs">
          Transaction
        </Button>
      </footer>
    </div>
  );
}
