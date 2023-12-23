import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuthData } from "@/data/hook/use-auth-data";

export const AvatarIcon = () => {
  const { user } = useAuthData();
  const image = user?.imageUrl || "https://source.unsplash.com/random";
  const getInitials = (fullName: string | undefined): string => {
    if (fullName) {
      const nameParts = fullName.split(" ");
      const firstNameInitial = nameParts[0]?.charAt(0) || "";
      const lastNameInitial = nameParts[1]?.charAt(0) || "";

      return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
    }
    return "AN";
  };
  return (
    <Link href="/profile">
      <Avatar>
        <AvatarImage src={image} alt="Avatar do usuário" />
        <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
      </Avatar>
    </Link>
  );
};
