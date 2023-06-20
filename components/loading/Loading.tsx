"use client"
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#D9E4DD"
        },
        secondary: {
            main: "#FBF7F0",
        },
    },
});

export default function CircularIndeterminate() {
    return (
        <Box style={{ marginBottom: "4rem" }} sx={{ display: 'flex' }}>
            <ThemeProvider theme={theme}>
                <CircularProgress color="primary" />
            </ThemeProvider>
        </Box>
    );
}