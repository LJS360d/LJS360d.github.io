import { useEffect, useState, type ChangeEvent } from "react";
import { MdClose } from "react-icons/md";
import type { Route } from "../../models/types/route.type";
import Toolbar from "./Toolbar";

interface SidebarProps {
  data: SidebarData;
  changeTheme: (event: ChangeEvent<HTMLSelectElement>) => void;
}

interface SidebarData {
  title: string;
  theme?: string;
  themes: string[];
  version: string;
  routes: Route[];
}

export default function Sidebar({ data, changeTheme }: SidebarProps) {
  const { themes, version, routes, title, theme } = data;
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>(theme);
  const sidebarId = "toggle-sidebar";

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
                    {route.icon({})}
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
