'use client'
import { createTheme } from '@mui/material/styles';
import mediaQuery from "css-mediaquery"; // Add this dependency
import karnxLogo from "@/public/imgs/karnx_logo.svg";
import loginBackground from "@/public/imgs/loginbg.png";
import loginVideo from "@/public/videos/KarnXwings.mp4"

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
            borderColor: string;
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
            borderColor: string;
        }
    }
}

export const karnxTheme = createTheme({

    images: {
        logo: karnxLogo,
        loginBg: loginBackground,
        loginBgVideo: loginVideo,
        // loginBgVideo: '/videos/karnXwings.mp4'
    },
    heading: {
        color: '#03045E',
        marginBottom: '30px'
    },
    common: {
        blueColor: '#03045E',
        redColor: '#BC0019',
        borderColor: '#E6E6E6'
    },

    typography: {
        fontFamily: "poppins",
        body1: {
            fontSize: "16px",
            "@media (max-width:900px)": {
                fontSize: "14px",
            },
        },
        h1: {
            fontFamily: "poppins-semibold",
            fontSize: '18px',
            "@media (min-width:600px)": {
                fontSize: "20px", // sm
            },
            "@media (min-width:900px)": {
                fontSize: "24px", // md
            },
            "@media (min-width:1200px)": {
                fontSize: "28px", // lg
            },
            "@media (min-width:1536px)": {
                fontSize: "32px", // xl
            },
        },
        h2: {
            fontFamily: "poppins-semibold",
            fontSize: '16px',
            "@mediaQuery (min-width:600px)": {
                fontSize: "16px", // sm
            },
            "@media (min-width:900px)": {
                fontSize: "20px", // md
            },
            "@media (min-width:1200px)": {
                fontSize: "24px", // lg
            },
            "@media (min-width:1536px)": {
                fontSize: "28px", // xl
            },
        },
        h3: {
            fontFamily: "poppins-semibold",
            fontSize: '16px',
            "@mediaQuery (min-width:600px)": {
                fontSize: "16px", // sm
            },
            "@media (min-width:900px)": {
                fontSize: "18px", // md
            },
            "@media (min-width:1200px)": {
                fontSize: "20px", // lg
            },
            "@media (min-width:1536px)": {
                fontSize: "24px", // xl
            },
        },
        h4: {
            fontFamily: "poppins-semibold",
            fontSize: '16px',
            "@mediaQuery (min-width:600px)": {
                fontSize: "15px", // sm
            },
            "@media (min-width:900px)": {
                fontSize: "16px", // md
            },
            "@media (min-width:1200px)": {
                fontSize: "18px", // lg
            },
            "@media (min-width:1536px)": {
                fontSize: "20px", // xl
            },
        },
        h5: {
            fontFamily: "poppins-semibold",
            fontSize: '16px',
            "@media (max-width:900px)": {
                fontSize: "14px", // md
            },
        },
        h6: {
            fontFamily: "poppins-semibold",
            fontSize: '14px',
            lineHeight: '14px'
        },
        body2: {
            color: "#4D4D4D",
            fontFamily: "'poppins-lt', sans-serif",
            fontSize: "0.875rem",
            "@media (min-width:900px)": {
                fontSize: "1rem",
            },
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

                    '&.MuiButton-sizeLarge': {
                        fontFamily: 'poppins-semibold'
                    }
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
                ".react-table tbody td": {
                    fontSize: '14px',
                },
                ".react-table thead th": {
                    fontSize: '14px',
                    fontFamily: "poppins-semibold, sans-serif",
                    paddingBlock: '14px',

                    '& .MuiInputBase-root::after': {
                        opacity: 0
                    },

                    '& input': {
                        fontSize: '14px',
                        lineHeight: '14px',
                        fontFamily: "poppins-lt, sans-serif",
                    }
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
                    '&.MuiInputBase-root .MuiSelect-select .MuiTypography-body1': {
                        fontSize: '12px'
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
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    transitionDuration: "300ms",
                    "&.Mui-checked": {
                        color: "#03045E",
                        "& + .MuiSwitch-track": {
                            backgroundColor: "#03045ED6", // active color
                            opacity: 1,
                        },
                    },
                },
                track: {
                    backgroundColor: "#BDBDBD",
                    opacity: 1,
                    transition: "background-color 300ms",
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
