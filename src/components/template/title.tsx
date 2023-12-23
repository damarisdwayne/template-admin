import React from "react";

interface TitleProps {
  title: string;
  subTitle: string;
}

export const Title = (props: TitleProps) => {
  return (
    <div>
      <h1 className="font-black text-3xl">{props.title}</h1>
      <h1 className="font-light text-sm">{props.subTitle}</h1>
    </div>
  );
};
