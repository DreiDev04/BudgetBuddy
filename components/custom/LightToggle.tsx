import React, { useEffect, useState } from 'react'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Label } from '../ui/label';
import { Switch } from "@/components/ui/switch"
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const LightToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(resolvedTheme === 'dark');
  }, [resolvedTheme])

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDark(!isDark);
  };

  const modeLabel = isDark ? 'Light Mode' : 'Dark Mode';

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{modeLabel}</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip={modeLabel} onClick={toggleTheme} asChild>
            <div className='flex items-center gap-2'>
              <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`}/>
              <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`}/>
              <span className="sr-only">Toggle theme</span>
              <Label>{modeLabel}</Label>
              <Switch checked={isDark} onCheckedChange={toggleTheme} />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

export default LightToggle;
