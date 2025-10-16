"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { IconButton, Paper, Typography, Box, TextField, Button, Chip, Divider } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { useAssistant } from "@/app/context/AssistantContext";

const AssistantWidget: React.FC = () => {
  const { enabled, open, toggleOpen, messages, addMessage, suggest } = useAssistant();
  const [input, setInput] = useState("");
  const [tips, setTips] = useState<string[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const compute = () => {
      const selection = window.getSelection?.()?.toString() ?? "";
      setTips(suggest({ selection }));
    };

    compute();
    const onMove = () => compute();
    window.addEventListener("selectionchange", onMove);
    return () => window.removeEventListener("selectionchange", onMove);
  }, [enabled, suggest]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        toggleOpen();
      } else if (e.key === "Escape") {
        if (open) toggleOpen();
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [open, toggleOpen]);

  if (!enabled) return null;

  return (
    <>
      <Box sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 2000 }}>
        <IconButton color="primary" size="large" onClick={toggleOpen} sx={{ bgcolor: "background.paper", boxShadow: 3 }}>
          <ChatIcon />
        </IconButton>
      </Box>

      {open && (
        <Paper elevation={6} sx={{ position: "fixed", bottom: 92, right: 24, width: 380, maxHeight: 520, display: "flex", flexDirection: "column", zIndex: 2100 }}>
          <Box sx={{ display: "flex", alignItems: "center", p: 1.5, borderBottom: 1, borderColor: "divider" }}>
            <TipsAndUpdatesIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="subtitle1" sx={{ flex: 1 }}>Assistant</Typography>
            <IconButton size="small" onClick={toggleOpen}><CloseIcon /></IconButton>
          </Box>

          <Box sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 1, overflow: "auto" }} ref={boxRef}>
            {tips.length > 0 && (
              <Box>
                <Typography variant="caption" color="text.secondary">Suggestions</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
                  {tips.map((t, idx) => (
                    <Chip key={idx} label={t} size="small" sx={{ maxWidth: "100%" }} />
                  ))}
                </Box>
              </Box>
            )}
            {messages.map((m) => (
              <Box key={m.id} sx={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", bgcolor: m.role === "user" ? "primary.main" : "grey.100", color: m.role === "user" ? "primary.contrastText" : "text.primary", p: 1, borderRadius: 1 }}>
                <Typography variant="body2">{m.content}</Typography>
              </Box>
            ))}
          </Box>

          <Divider />
          <Box sx={{ p: 1.5, display: "flex", gap: 1 }}>
            <TextField fullWidth size="small" placeholder="Ask or jot a note..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && input.trim()) { addMessage(input.trim(), "user"); setInput(""); } }}/>
            <Button variant="contained" onClick={() => { if (input.trim()) { addMessage(input.trim(), "user"); setInput(""); }}}>Send</Button>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default AssistantWidget;
