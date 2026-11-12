"use client";

import { ToastContainer as ReactToastifyContainer } from "react-toastify";
import { useTheme } from "next-themes";

function ToastContainer() {
  const { resolvedTheme } = useTheme();
  return (
    <ReactToastifyContainer theme={resolvedTheme === "dark" ? "dark" : "light"} />
  );
}

export { ToastContainer };
