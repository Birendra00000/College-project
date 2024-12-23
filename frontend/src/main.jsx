import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import AuthProvider from "./AuthContext/AuthUser.jsx";
import { BookmarkProvider } from "./AuthContext/BookmarkContext.jsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {" "}
        <BookmarkProvider>
          <MantineProvider>
            {" "}
            <App />
          </MantineProvider>{" "}
        </BookmarkProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
