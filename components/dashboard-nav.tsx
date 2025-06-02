"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { LayoutDashboard, FolderOpen, Briefcase } from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: FolderOpen,
  },
  {
    name: "Freelance Projects",
    href: "/dashboard/freelance-projects",
    icon: Briefcase,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center space-x-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-slate-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">AP</span>
          </div>
          <span className="font-bold text-xl">Admin Portal</span>
        </Link>
        <nav className="flex items-center space-x-1">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.name}
                variant={pathname === item.href ? "default" : "ghost"}
                asChild
                className={cn("justify-start", pathname === item.href && "bg-slate-600 text-white hover:bg-slate-700")}
              >
                <Link href={item.href}>
                  <Icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            )
          })}
        </nav>
      </div>
      <ModeToggle />
    </div>
  )
}
