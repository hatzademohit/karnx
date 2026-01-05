import useMediaQuery from "@mui/material/useMediaQuery";

export const useResponsive = () => {
    const isXs = useMediaQuery("(max-width:599.5px)");
    const isSm = useMediaQuery("(max-width:768px)");
    const isMd = useMediaQuery("(max-width:899.5px)");
    const isLg = useMediaQuery("(max-width:1200px)");

    return { isXs, isSm, isMd, isLg };
};
