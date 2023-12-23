import Image from "next/image";
import Loader from "../../public/images/loader.gif";
import React from "react";
import { useAuthData } from "@/data/hook/use-auth-data";
import { useRouter } from "next/router";
import Head from "next/head";

interface ForceAuthProps {
  children: React.ReactNode;
}

export const ForceAuth = (props: ForceAuthProps) => {
  const { isLoading, user } = useAuthData();
  const router = useRouter();
  const renderContent = () => {
    return (
      <>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `if(!document.cookie?.includes("admin-template-auth")) {
              window.location.href = "/auth"
            }`,
            }}
          />
        </Head>
        {props.children}
      </>
    );
  };

  const renderLoading = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={Loader} alt="loading" />
      </div>
    );
  };
  if (!isLoading && user?.email) return renderContent();
  else if (isLoading) return renderLoading();
  else {
    router.push("/auth");
    return null;
  }
};
