import { SettingsIcon, BellIcon, HomeICon, LogoutIcon } from "../icons";
import { Brand } from "./brand";
import { SideMenuItem } from "./side-menu-item";

export const SideMenu = () => {
  return (
    <aside className="flex flex-col bg-accent">
      <div className="flex flex-col items-center justify-center h-20 w-20 bg-gradient-to-r from-indigo-500 to-purple-800">
        <Brand />
      </div>
      <ul className="flex-grow">
        <SideMenuItem label="Início" url="/" icon={HomeICon} />
        <SideMenuItem label="Ajustes" url="/settings" icon={SettingsIcon} />
        <SideMenuItem label="Notificações" url="/news" icon={BellIcon} />
      </ul>
      <ul>
        <SideMenuItem
          label="Sair"
          onClick={() => console.log("sair")}
          className="text-destructive hover:bg-destructive hover:text-white"
          icon={LogoutIcon}
        />
      </ul>
    </aside>
  );
};
