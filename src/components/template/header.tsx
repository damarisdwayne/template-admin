import React from "react";
import { Title } from "./title";
import { ModeToggle } from "../mode-toggle";
import { AvatarIcon } from "./avatar";

interface HeaderProps {
  title: string;
  subTitle: string;
}

export const Header = (props: HeaderProps) => {
  return (
    <div className="flex">
      <Title title={props.title} subTitle={props.subTitle} />
      <div className="flex flex-grow justify-end items-center gap-3">
        <ModeToggle />
        <AvatarIcon />
      </div>
    </div>
  );
};
