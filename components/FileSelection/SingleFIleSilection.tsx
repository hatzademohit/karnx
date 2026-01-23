"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

type SingleFileSelectionProps = {
    value?: File | null;
    onChange?: (file: File | null) => void;
    accept?: string;
    disabled?: boolean;
};

const SingleFileSelection: React.FC<SingleFileSelectionProps> = ({
    value = null,
    onChange,
    accept,
    disabled,
}) => {
    const [file, setFile] = useState<File | null>(value);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const selectedFile = acceptedFiles[0] || null;
            setFile(selectedFile);
            onChange?.(selectedFile);
        },
        [onChange]
    );

    useEffect(() => {
        setFile(value || null);
    }, [value]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        disabled,
        accept: accept
            ? accept.split(",").reduce((acc: any, ext) => {
                acc[ext.trim()] = [];
                return acc;
            }, {})
            : undefined,
    });

    return (
        <Box display="flex" flexDirection="column" alignItems="center" width="100%" gap={1}>
            <Paper
                {...getRootProps()}
                sx={{
                    width: "100%",
                    p: 5,
                    border: "2px dashed",
                    borderRadius: 3,
                    borderColor: isDragActive ? "primary.main" : "grey.400",
                    bgcolor: isDragActive ? "action.hover" : "background.paper",
                    textAlign: "center",
                    cursor: disabled ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease-in-out",
                    boxShadow: "unset",
                    opacity: disabled ? 0.6 : 1,
                }}
            >
                <input {...getInputProps()} />

                {isDragActive ? (
                    <Typography color="primary">Drop the file here …</Typography>
                ) : (
                    <Typography color="text.secondary">
                        Drag & drop a file here, or{" "}
                        <Typography component="span" color="primary" fontWeight="bold">
                            browse
                        </Typography>
                    </Typography>
                )}
            </Paper>

            {file && (
                <List dense sx={{ p: 0, width: "100%" }}>
                    <ListItem sx={{ p: 0 }}>
                        <ListItemText
                            primary={file.name}
                            sx={{
                                "& .MuiListItemText-primary": {
                                    color: "#555",
                                    fontFamily: "poppins-lt",
                                },
                            }}
                        />
                    </ListItem>
                </List>
            )}
        </Box>
    );
};

export default SingleFileSelection;
