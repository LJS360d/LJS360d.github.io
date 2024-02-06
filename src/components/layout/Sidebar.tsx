import { type ChangeEvent, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Toolbar from "./Toolbar";
import type { Route } from "../../models/types/route.type";

interface SidebarProps {
  title: string;
  theme?: string;
  themes: string[];
  version: string;
  routes: Route[];
}

export default function Sidebar({
  themes,
  version,
  routes,
  title,
  theme,
}: SidebarProps) {
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>(theme);
  const sidebarId = "toggle-sidebar";
  const changeTheme = (event: ChangeEvent<HTMLSelectElement>) => {
    const newTheme = event.target.value;
    setSelectedTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setSelectedTheme(storedTheme);
    }
  }, []);

  return (
    <div className="drawer sticky top-0 z-40">
      <input id={sidebarId} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Toolbar title={title} sidebarId={sidebarId} />
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor={sidebarId}
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <div className="bg-base-300 flex flex-col h-full justify-between w-60">
          <div>
            <header className="flex w-full">
              <label
                htmlFor={sidebarId}
                className="justify-start w-full btn btn-ghost"
              >
                <MdClose className="text-2xl" />
              </label>
            </header>
            <ul className="menu text-lg">
              {routes.map((route, index) => (
                <li key={index} className="capitalize">
                  <a href={route.route}>
                    <route.icon />
                    <span>{route.label ?? route.route}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <footer className="flex flex-col items-center justify-center pb-2">
            <div className="w-1/2">
              <div className="label">
                <span className="label-text">Theme</span>
              </div>
              <select
                id="theme-select"
                className="select select-secondary capitalize w-full"
                name="theme"
                onChange={changeTheme}
                value={selectedTheme}
              >
                {themes.map((t, index) => (
                  <option key={index} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-sm">
              Version: <b className="font-bold">{version}</b>
            </span>
          </footer>
        </div>
      </div>
    </div>
  );
}
