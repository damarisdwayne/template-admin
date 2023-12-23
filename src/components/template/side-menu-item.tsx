import Link from "next/link";

interface SideMenuItemProps {
  label: string;
  icon: any;
  url?: string;
  className?: string;
  onClick?: (event: any) => void;
}

export const SideMenuItem = (props: SideMenuItemProps) => {
  const renderLink = () => {
    return (
      <span className="flex flex-col justify-center items-center h-20 w-20">
        {props.icon}
        <span className="text-xs font-light">{props.label}</span>
      </span>
    );
  };
  return (
    <li
      onClick={props.onClick}
      className={`hover:bg-primary/5 transition-all duration-200 cursor-pointer  ${props.className}`}
    >
      {props.url ? <Link href={props.url}>{renderLink()}</Link> : renderLink()}
    </li>
  );
};
