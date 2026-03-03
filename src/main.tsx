import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#13141F",
            color: "#F0F0F5",
            border: "1px solid rgba(255,255,255,0.07)",
          },
        }}
      />
    </Provider>
  </StrictMode>,
);
