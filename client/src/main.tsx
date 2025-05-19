import { createRoot } from "react-dom/client";
import "@/index.css";
import { store } from "@/stores/store";
import { Provider } from "react-redux";
import ErrorBoundary from "@/components/ErrorBoundary";
import router from "@/routers/routes";
import { RouterProvider } from "react-router-dom";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
