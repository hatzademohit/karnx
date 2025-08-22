import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface PageInfoBoxProps{
    Heading?: string;
    listData?: any[]
    Icon?: any;
}

const PageInfoBox:FC<PageInfoBoxProps> = ({ Heading, listData, Icon }) => {
    return(
        <Box sx={{ border: '1px solid #cccccc' }}>
            <Box sx={{ padding: '6px 8px', backgroundColor: '#eeeeee', borderBottom: '1px solid #cccccc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Box sx={{display: 'flex', '& svg': {fontSize: '20px'}}}>{Icon}</Box>
                <Typography component='h4' variant="h4" sx={{color: '#'}}>{Heading}</Typography>
            </Box>
            <Box sx={{ '& a': { textDecoration: 'none', color: '#333333' } }}>
                <List sx={{ listStyleType: "disc", pl: 4 }}>
                    {listData.map((item, index) => (
                        <ListItem key={index} sx={{ display: "list-item", padding: '5px 10px' }}>
                            <Link href={item.pathName}>
                                <ListItemText primary={item.pageName} sx={{ margin: 0 }} />
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    )
}

export default PageInfoBox;
