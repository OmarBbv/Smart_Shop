import { createRoot } from "react-dom/client";
import "@/index.css";
import { store } from "@/stores/store";
import { Provider } from "react-redux";
import ErrorBoundary from "@/components/ErrorBoundary";
import router from "@/routers/routes";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/queryClient";
import { Toaster } from "react-hot-toast";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" />
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </QueryClientProvider>
    </Provider>
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
