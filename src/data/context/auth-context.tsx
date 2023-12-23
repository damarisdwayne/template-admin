import { ReactNode, createContext, useState } from "react";
import { useRouter } from "next/router.js";
import { IAuthRequest, IUser } from "@/types/auth";
import Cookies from "js-cookie";
import firebase from "../../firebase/config.js";
import { useEffect } from "react";

interface AuthContextProps {
  user?: IUser;
  register?: (data: IAuthRequest) => Promise<void>;
  login?: (data: IAuthRequest) => Promise<void>;
  loginGoogle?: () => Promise<void>;
  logout?: () => Promise<void>;
  isLoading?: boolean;
  children?: ReactNode;
}

const initialUser: IUser = {
  uid: "",
  email: "",
  name: "",
  token: "",
  provider: "",
  imageUrl: "",
};

const convertFirebaseUser = async (
  firebaseUser: firebase.User,
): Promise<IUser> => {
  const token = await firebaseUser.getIdToken();
  return {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || "",
    email: firebaseUser.email || "",
    token,
    provider: firebaseUser.providerId,
    imageUrl: firebaseUser.photoURL || "",
  };
};
const manageCookie = (logged: boolean) => {
  if (logged) {
    Cookies.set("admin-template-auth", String(logged), {
      expires: 7,
    });
  } else {
    Cookies.remove("admin-template-auth");
  }
};

const AuthContext = createContext<AuthContextProps>({});

export const AuthProvider = (props: AuthContextProps) => {
  const [user, setUser] = useState<IUser>(initialUser);
  const [isLoading, setLoading] = useState(true);
  const route = useRouter();

  const configureSession = async (firebaseUser: firebase.User | null) => {
    if (firebaseUser?.email) {
      const user = await convertFirebaseUser(firebaseUser);
      setUser(user);
      manageCookie(true);
      setLoading(false);
      return user.email;
    } else {
      setUser(initialUser);
      manageCookie(false);
      setLoading(false);
      return false;
    }
  };

  const loginGoogle = async () => {
    try {
      setLoading(true);
      const response = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());

      if (response.user) {
        await configureSession(response.user);
        route.push("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }: IAuthRequest) => {
    try {
      setLoading(true);
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      if (response.user) {
        await configureSession(response.user);
        route.push("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ email, password }: IAuthRequest) => {
    try {
      setLoading(true);
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (response.user) {
        await configureSession(response.user);
        route.push("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await firebase.auth().signOut();
      await configureSession(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Cookies.get("admin-template-auth")) {
      const cancel = firebase.auth().onIdTokenChanged(configureSession);
      return () => cancel();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, register, login, loginGoogle, logout, isLoading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
