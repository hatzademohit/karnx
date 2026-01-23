"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

type FileSelectionProps = {
  onFileSelect?: (files: File[]) => void;
  defaultValue?: File[];
  accept?: string;
  disabled?: boolean;
  multiple?: boolean;
};

const FileSelection: React.FC<FileSelectionProps> = ({ onFileSelect, defaultValue, accept, disabled, multiple }) => {

  const [selectedFiles, setSelectedFiles] = useState<File[]>(defaultValue || []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFileSelect?.(acceptedFiles);
      const newFiles = [...selectedFiles, ...acceptedFiles];
      setSelectedFiles(newFiles);
      onFileSelect?.(newFiles);
    },
    [onFileSelect, selectedFiles]
  );

  useEffect(() => {
    if (defaultValue && defaultValue.length > 0) {
      setSelectedFiles(defaultValue);
    }
  }, [defaultValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: '100%' }} gap={1}>
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
          boxShadow: 'unset',
          '&:has(> input[disabled])': { backgroundColor: '#dfdfdf', cursor: 'not-allowed' },
        }}
      >
        <input {...getInputProps()} disabled={disabled} accept={accept} multiple={multiple} />
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

      {selectedFiles.length > 0 && (
        <Box width="100%" sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Typography variant="subtitle1" fontWeight="medium">
            Selected files:
          </Typography>
          <List dense sx={{ p: 0 }}>
            {selectedFiles.map((file, i) => (
              <ListItem key={i} sx={{ p: 0 }}>
                <ListItemText primary={file.name} sx={{ '& .MuiListItemText-primary': { color: '#555555', fontFamily: 'poppins-lt' } }} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default FileSelection;
