import { Search, User, Bell, Settings, LogOut, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo and Brand */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {/* MARLIN Logo - using a styled div as placeholder */}
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-ocean">
              <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-white"></div>
              </div>
            </div>
            <div className="text-left hidden sm:block">
              <h1 className="text-ocean-blue">MARLIN</h1>
              <p className="text-xs text-muted-foreground">Maritime Monitoring</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Button variant="ghost" className="text-ocean-blue hover:text-ocean-blue hover:bg-ocean-blue/10">
              Dashboard
            </Button>
            <Button variant="ghost" className="hover:text-ocean-blue hover:bg-ocean-blue/10">
              Vessels
            </Button>
            <Button variant="ghost" className="hover:text-ocean-blue hover:bg-ocean-blue/10">
              Events
            </Button>
            <Button variant="ghost" className="hover:text-ocean-blue hover:bg-ocean-blue/10">
              Downloads
            </Button>
          </div>
        </div>

        {/* Search and User Controls */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search vessels, events or coordinates…"
              className="w-64 pl-9 border-ocean-blue/20 focus:border-ocean-blue"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative hover:bg-ocean-blue/10">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground p-0 flex items-center justify-center text-xs">
              3
            </Badge>
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-ocean-blue text-white">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">
                  Maritime Regulator
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
