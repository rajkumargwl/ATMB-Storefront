// app/components/FocusHandler.tsx
import { useEffect, useRef } from "react";
import { useLocation } from "@remix-run/react";

export default function FocusHandler() {
  const { pathname } = useLocation();
  const focusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Move focus when route changes
    focusRef.current?.focus();
  }, [pathname]);

  return (
    <div
      ref={focusRef}
      tabIndex={-1}
      aria-hidden="false"
      style={{ outline: "none" }}
    />
  );
}
