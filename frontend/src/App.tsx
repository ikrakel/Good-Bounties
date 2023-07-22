import { BrowserRouter } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy";
import { AppRouter } from "./routers/App.router";
import "./App.css";
import { theme } from "./Theme";
import { DialogProvider } from "./contexts/DialogContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { GlobalContextProvider } from "./contexts/GlobalContext";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Toaster } from "react-hot-toast";
import { Web3AuthProvider } from "./contexts/Web3AuthProvider";

const queryClient = new QueryClient();

export default function App() {
  return (
    <CssVarsProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <QueryClientProvider client={queryClient}>
          <Web3AuthProvider>
            <GlobalContextProvider>
              <DialogProvider>
                <BrowserRouter>
                  <Toaster position="top-right" />
                  <AppRouter />
                </BrowserRouter>
              </DialogProvider>
            </GlobalContextProvider>
          </Web3AuthProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </CssVarsProvider>
  );
}
