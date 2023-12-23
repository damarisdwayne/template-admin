import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/data/context/app-context";
import { AuthProvider } from "@/data/context/auth-context";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
