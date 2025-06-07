import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routers";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/config/queryClient";
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" containerStyle={{ zIndex: '99999' }} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
