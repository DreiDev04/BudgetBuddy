import React, { useState } from 'react'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Label } from '../ui/label';


const LightToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(resolvedTheme === 'dark');

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDark(!isDark);
  };

  const modeLabel = isDark ? 'Dark Mode' : 'Light Mode';

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{isDark ? 'Light' : 'Dark'} Mode</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={toggleTheme} asChild tooltip={modeLabel} >
            <div>
              <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`}/>
              <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`}/>
              <span className="sr-only">Toggle theme</span>
              <Label>{modeLabel}</Label>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

export default LightToggle;
