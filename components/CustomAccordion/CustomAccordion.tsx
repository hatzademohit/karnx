"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, { AccordionSummaryProps, accordionSummaryClasses } from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Box, Typography, useTheme } from "@mui/material";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={1} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&::before": {
        display: "none",
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: '#BC0019' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: "#ffffff",
    flexDirection: "row-reverse",
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
        transform: "rotate(90deg)",
    },
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export interface AccordionItemProps {
    id: string;
    title: string;
    errors?: string;
    asterisk?: boolean;
    content: React.ReactNode;
}

interface CustomAccordionProps {
    items: AccordionItemProps[];
}

export default function CustomAccordion({ items }: CustomAccordionProps) {

    const theme = useTheme();

    const [expanded, setExpanded] = React.useState<string | false>(
        items?.[0]?.id || false
    );

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Box className="cust-container" sx={{}}>
            {items.map((item) => (
                <Accordion
                    className="cust-accordion"
                    key={item.id}
                    expanded={expanded === item.id}
                    onChange={handleChange(item.id)}
                >
                    <AccordionSummary sx={{ '& .MuiAccordionSummary-content': { alignItems: 'baseline' } }}>
                        <Typography component="h5" variant="h5" color={theme?.common?.redColor}>
                            {item.title} {item.asterisk && <Typography component="span">*</Typography>}
                        </Typography>
                        {item.errors && <Typography color="error" className="fs12 error-msg" sx={{ ml: '8px !important', display: 'none' }}>({item.errors})</Typography>}
                    </AccordionSummary>
                    <AccordionDetails>
                        {item.content}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}
