'use client'
import { createTheme } from '@mui/material/styles';
import mediaQuery from "css-mediaquery"; // Add this dependency
import karnxLogo from "@/public/imgs/karnx_logo.svg";
import loginBackground from "@/public/imgs/loginbg.png";

function createSsrMatchMedia(width: number) {
    return (query: string) => ({
        matches: mediaQuery.match(query, { width }),
    });
}

declare module "@mui/material/styles" {
    interface Theme {
        images: {
            logo: string;
            loginBg: any;
            loginBgVideo: any;
        };
        heading: {
            color: string;
            marginBottom: string
        };
        common: {
            blueColor: string;
            redColor: string;
        }
    }
    interface ThemeOptions {
        images?: {
            logo?: string;
            loginBg?: any;
            loginBgVideo?: any;
        };
        heading: {
            color: string;
            marginBottom: string
        };
        common: {
            blueColor: string;
            redColor: string;
        }
    }
}

export const karnxTheme = createTheme({

    images: {
        logo: karnxLogo,
        loginBg: loginBackground,
        loginBgVideo: '/videos/karnXwings.mp4'
    },
    heading: {
        color: '#03045E',
        marginBottom: '30px'
    },
    common: {
        blueColor: '#03045E',
        redColor: '#BC0019',
    },

    typography: {
        fontFamily: 'poppins',
        h1: {
            fontSize: 32,
            fontFamily: 'poppins-semibold'
        },
        h2: {
            fontSize: 28,
            fontFamily: 'poppins-semibold'
        },
        h3: {
            fontSize: 24,
            fontFamily: 'poppins-semibold'
        },
        h4: {
            fontSize: 20,
            fontFamily: 'poppins-semibold'
        },
        h5: {
            fontSize: 16,
            fontFamily: 'poppins-semibold'
        },
        h6: {
            fontSize: 14,
            fontFamily: 'poppins-semibold'
        },
    },
    components: {
        MuiUseMediaQuery: {
            defaultProps: {
                ssrMatchMedia: createSsrMatchMedia(1024),
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'capitalize',
                    fontFamily: 'poppins-lt',
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontFamily: "poppins-lt, sans-serif",
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                // ".MuiDataGrid-columnHeaders": {
                //     fontFamily: "Verdana, sans-serif",
                //     fontWeight: 600,
                // },
                ".MuiDataGrid-cell": {
                    fontFamily: "poppins-lt, sans-serif",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    fontSize: '12px',
                    fontFamily: 'poppins',
                    color: '#333333',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#CCCCCC',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#666666',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#03045E',
                        borderWidth: '2px',
                    },
                    '&.Mui-disabled': {
                        color: '#333333',
                        backgroundColor: '#dfdfdf',
                    },
                },
                input: {
                    fontSize: "12px",
                    '&::placeholder': {
                        color: '#CCCCCC',
                        opacity: 1,
                    },
                },
            }
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: "#333333",
                    "&.Mui-checked": {
                        color: "#03045E",
                    },
                    "&.MuiCheckbox-indeterminate": {
                        color: "#03045E",
                    },
                    "&.Mui-disabled": {
                        color: "#cccccc",
                    },
                },
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: "#333333",
                    "&.Mui-checked": {
                        color: "#03045E",
                    },
                    "&.Mui-disabled": {
                        color: "#cccccc",
                    },
                },
            },
        },
    },
    palette: {
        text: {
            primary: '#333333'
        }
    }
});
