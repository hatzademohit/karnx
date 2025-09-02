"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {  Box,  Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

type FileSelectionProps = {
  onFileSelect?: (files: File[]) => void;
};

const FileSelection: React.FC<FileSelectionProps> = ({ onFileSelect }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log("Selected files:", acceptedFiles);
      onFileSelect?.(acceptedFiles);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{width: '100%'}} gap={2}>
      <Paper
        {...getRootProps()}
        elevation={isDragActive ? 6 : 2}
        sx={{
          width: "100%",
          p: 5,
          border: "2px dashed",
          borderRadius: 3,
          borderColor: isDragActive ? "primary.main" : "grey.400",
          bgcolor: isDragActive ? "action.hover" : "background.paper",
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          boxShadow: 'unset'
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography color="primary">Drop the files here ...</Typography>
        ) : (
          <Typography color="text.secondary">
            Drag & drop files here, or{" "}
            <Typography component="span" color="primary" fontWeight="bold">
              browse
            </Typography>
          </Typography>
        )}
      </Paper>

      {acceptedFiles.length > 0 && (
        <Box width="100%" maxWidth={500}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Selected files:
          </Typography>
          <List dense>
            {acceptedFiles.map((file, i) => (
              <ListItem key={i} sx={{ p: 0 }}>
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default FileSelection;
