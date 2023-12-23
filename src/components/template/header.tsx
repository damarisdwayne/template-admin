import React from "react";
import { Title } from "./title";

interface HeaderProps {
  title: string;
  subTitle: string;
}

export const Header = (props: HeaderProps) => {
  return (
    <div>
      <Title title={props.title} subTitle={props.subTitle} />
    </div>
  );
};
