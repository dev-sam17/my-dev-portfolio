"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  LayoutDashboard,
  FolderOpen,
  Briefcase,
  MessageSquare,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: FolderOpen,
  },
  {
    name: "Freelance Projects",
    href: "/admin/freelance-projects",
    icon: Briefcase,
  },
  {
    name: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },
];

function UserDropdown() {
  const { data: session } = useSession();
  
  if (!session?.user) {
    return null;
  }

  const userInitials = session.user.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            {session.user.image ? (
              <AvatarImage src={session.user.image} alt={session.user.name || "User"} />
            ) : (
              <AvatarFallback className="bg-slate-600 text-white">
                {userInitials}
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{session.user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/admin/settings" className="cursor-pointer w-full">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => signOut({ callbackUrl: "/" })} 
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center space-x-6">
        <Link href="/admin" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-slate-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">AP</span>
          </div>
          <span className="font-bold text-xl">Admin Portal</span>
        </Link>
        <nav className="flex items-center space-x-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.name}
                variant={pathname === item.href ? "default" : "ghost"}
                asChild
                className={cn(
                  "justify-start",
                  pathname === item.href &&
                    "bg-slate-600 text-white hover:bg-slate-700"
                )}
              >
                <Link href={item.href}>
                  <Icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        <UserDropdown />
      </div>
    </div>
  );
}
