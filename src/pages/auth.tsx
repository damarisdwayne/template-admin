import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { AuthForm } from "@/components/form/auth";
import { useAuthData } from "@/data/hook/use-auth-data";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const isLoginMode = mode === "login";
  const { register, login, loginGoogle } = useAuthData();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className=" md:w-1/2 md:block lg:w-2/3 hidden">
        <img
          src="https://source.unsplash.com/random"
          alt="Imagem tela de autenticação"
          className="h-screen w-full object-cover"
        />
      </div>
      <div className="md:w-1/2 lg:w-1/3 w-full p-10">
        {isLoginMode ? (
          <AuthForm
            title="Entrar com sua conta"
            submitText="Entrar"
            onSubmit={login!}
          />
        ) : (
          <AuthForm
            title="Cadastrar"
            submitText="Cadastrar"
            onSubmit={register!}
          />
        )}
        <Separator className="my-5" />
        <Button
          className="w-full"
          variant="destructive"
          type="button"
          onClick={loginGoogle}
        >
          Entrar com o Google
        </Button>
        {isLoginMode ? (
          <p className="mt-7">
            Novo por aqui?
            <a
              onClick={() => setMode("register")}
              className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
            >
              {" "}
              Crie uma nova conta
            </a>
          </p>
        ) : (
          <p className="mt-7">
            Já tem uma conta?
            <a
              onClick={() => setMode("login")}
              className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
            >
              {" "}
              Entrar com suas credenciais
            </a>
          </p>
        )}
      </div>
    </div>
  );
};
export default Auth;
