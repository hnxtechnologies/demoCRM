"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Bell, ChevronDown, Moon, Search, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  isDark: boolean;
  setDark: (next: boolean) => void;
  notifications: Array<{ id: string; title: string; time: string; read: boolean }>;
  onLogout: () => void;
};

export function TopNavbar({ search, setSearch, isDark, setDark, notifications, onLogout }: Props) {
  return (
    <header className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#161a28]/80 p-4 backdrop-blur-xl">
      <div className="flex min-w-[280px] flex-1 items-center gap-2 rounded-xl border border-white/10 bg-[#0f1320] px-3 py-2">
        <Search className="h-4 w-4 text-zinc-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for anything..."
          className="w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="relative rounded-xl border border-white/10 bg-[#0f1320] p-2 text-zinc-300 hover:text-white">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-cyan-400" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="z-40 w-72 rounded-xl border border-white/10 bg-[#111728] p-2 shadow-2xl">
            {notifications.map((item) => (
              <div key={item.id} className={cn("rounded-lg px-2 py-2 text-sm", item.read ? "text-zinc-400" : "text-zinc-100")}>
                <p>{item.title}</p>
                <p className="text-xs text-zinc-500">{item.time}</p>
              </div>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0f1320] px-3 py-2">
          <Sun className="h-4 w-4 text-amber-300" />
          <SwitchPrimitive.Root
            checked={isDark}
            onCheckedChange={setDark}
            className="relative h-5 w-10 rounded-full bg-zinc-700 data-[state=checked]:bg-violet-500"
          >
            <SwitchPrimitive.Thumb className="block h-4 w-4 translate-x-0.5 rounded-full bg-white transition-transform data-[state=checked]:translate-x-[1.15rem]" />
          </SwitchPrimitive.Root>
          <Moon className="h-4 w-4 text-violet-300" />
        </div>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0f1320] px-3 py-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-xs font-semibold text-black">
                KM
              </span>
              <ChevronDown className="h-4 w-4 text-zinc-400" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="z-40 w-44 rounded-xl border border-white/10 bg-[#111728] p-2 shadow-2xl">
            <button onClick={onLogout} className="w-full rounded-lg px-2 py-2 text-left text-sm text-zinc-200 hover:bg-white/5">
              Sign out
            </button>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}
