import { MdMenu } from "react-icons/md";

interface ToolbarProps {
  title: string;
  sidebarId: string;
}

export default function Toolbar({ title, sidebarId }: ToolbarProps) {
  return (
    <header className="navbar bg-base-300 shadow-lg sticky top-0 z-50">
      <div className="navbar-start gap-2">
        <label htmlFor={sidebarId} className="btn rounded-full btn-ghost">
          <MdMenu className="text-lg" />
        </label>
        <h1 className="select-none">{title}</h1>
      </div>
      <div className="navbar-center" />
      <div className="navbar-end" />
    </header>
  );
}
