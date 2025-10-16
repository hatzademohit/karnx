"use client";
import React, { createContext, useContext, useMemo, useState, useCallback, ReactNode } from "react";

export type AssistantMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  ts: number;
};

export type AssistantContextValue = {
  enabled: boolean;
  open: boolean;
  messages: AssistantMessage[];
  toggleOpen: () => void;
  setEnabled: (value: boolean) => void;
  addMessage: (
    msg: Omit<AssistantMessage, "id" | "ts"> | string,
    role?: AssistantMessage["role"]
  ) => void;
  clear: () => void;
  suggest: (context?: { route?: string; selection?: string }) => string[];
};

const AssistantContext = createContext<AssistantContextValue | undefined>(
  undefined
);

export const AssistantProvider = ({ children }: { children: ReactNode }) => {
  const [enabled, setEnabled] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);

  const toggleOpen = useCallback(() => setOpen((v) => !v), []);

  const addMessage = useCallback(
    (msg: any, role?: AssistantMessage["role"]) => {
      const normalized: AssistantMessage =
        typeof msg === "string"
          ? {
              id: crypto.randomUUID(),
              role: role ?? "user",
              content: msg,
              ts: Date.now(),
            }
          : {
              id: crypto.randomUUID(),
              role: msg.role ?? "user",
              content: msg.content,
              ts: Date.now(),
            };
      setMessages((prev) => [...prev, normalized]);
    },
    []
  );

  const clear = useCallback(() => setMessages([]), []);

  const suggest = useCallback((ctx?: { route?: string; selection?: string }) => {
    const tips: string[] = [];
    const route = ctx?.route ?? (typeof window !== "undefined" ? window.location.pathname : "");

    if (route?.toLowerCase().includes("inquiries")) {
      tips.push(
        "Use the Booking Inquiry page to create, edit, or export inquiries. Consider validating required fields with react-hook-form + yup.",
        "To fetch inquiries, use useApi hook with proper dependency array to avoid duplicate calls."
      );
    }

    if (ctx?.selection?.length) {
      tips.push(
        `Consider extracting "${ctx.selection.slice(0, 24)}..." into a reusable component or utility if used in multiple places.`
      );
    }

    tips.push(
      "Keyboard: Alt+K to toggle assistant. ESC to close.",
      "Type //todo in code to mark items; search 'TODO' repo-wide to track work."
    );

    return tips;
  }, []);

  const value = useMemo(
    () => ({
      enabled,
      open,
      messages,
      toggleOpen,
      setEnabled,
      addMessage,
      clear,
      suggest,
    }),
    [enabled, open, messages, toggleOpen, addMessage, clear, suggest]
  );

  return (
    <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>
  );
};

export const useAssistant = () => {
  const ctx = useContext(AssistantContext);
  if (!ctx) throw new Error("useAssistant must be used within AssistantProvider");
  return ctx;
};
