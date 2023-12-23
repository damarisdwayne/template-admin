import React from "react";

interface ContentProps {
  children: any;
}

export const Content = (props: ContentProps) => {
  return <div className="flex flex-col mt-7">{props.children}</div>;
};
