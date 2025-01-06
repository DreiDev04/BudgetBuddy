import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOutButton from "@/components/custom/SignOutButton";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      {/* Main Content (Header, Sidebar, Section) */}
      <div className="flex-grow sm:grid sm:grid-cols-12">
        {/* Sidebar for larger screens */}
        <aside className="hidden sm:flex sm:col-span-2 h-full flex-col justify-between items-center  border-r-2 border-r-zinc-800 bg-slate-200 dark:bg-zinc-900">
          <div>
            <h1 className="text-3xl p-4">LOGO</h1>
          </div>
          <nav className="flex flex-col gap-4 w-full p-2 ">
            <Button size="lg" className="text-md shadow-lg dark:border-2 dark:border-zinc-700">
              Dashboard
            </Button>
            <Button size="lg" className="text-md shadow-lg dark:border-2 dark:border-zinc-700">
              Transaction
            </Button>
            <Button size="lg" className="text-md shadow-lg dark:border-2 dark:border-zinc-700">
              Budget
            </Button>
            <Button size="lg" className="text-md shadow-lg dark:border-2 dark:border-zinc-700">
              Goals
            </Button>
          </nav>
          <div className="flex flex-col p-2 m-1 w-full ">
            <Button
            size="lg"
            variant="outline"
            className='md:text-md h-12 bg-transparent shadow-lg dark:border-2 dark:border-zinc-700'>
              <Plus className='md:text-md' /> ADD NEW
            </Button>
          </div>
        </aside>

        {/* Main Section */}
        <main className="sm:col-span-10 h-full flex flex-col ">
          {/* Header */}
          <header className=" w-full p-4 flex items-center justify-end border-b-2 border-b-zinc-800 gap-4 bg-tertiary dark:bg-slate-900">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-transparent">
                  Profile
                  <span>
                    <ChevronDown />
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent sticky="always" align="end">
                <DropdownMenuItem >
                  <SignOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          {/* Content Section */}
          <section className="flex-1 bg-slate-200 dark:bg-zinc-900 "></section>
        </main>
      </div>

      {/* Footer */}
      <footer className="sm:hidden p-4 flex flex-wrap justify-around items-center border-t-2 border-t-zinc-500 gap-2 bg-slate-200 dark:bg-gray-500">
        <Button size="icon" className="flex-1 text-xs">
          Dashboard
        </Button>
        <Button size="icon" className="flex-1 text-xs">
          Budget
        </Button>
        <Button size="icon" className="flex-1 text-xs bg-transparent shadow-lg dark:border-2 dark:border-zinc-700" variant="outline">
          <Plus />
        </Button>
        <Button size="icon" className="flex-1 text-xs">
          Goals
        </Button>
        <Button size="icon" className="flex-1 text-xs ">
          Transaction
        </Button>
      </footer>
    </div>
  );
}
