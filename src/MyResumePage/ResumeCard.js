import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ResumeCard(props) {
    const resumes = props.resumes

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 375,
                    height: 482,
                },
            }}
        >
            <Paper elevation={0} style={{margin: "15px"}}>
                <Grid container spacing={2} style={{padding: "0px"}}>
                    {resumes.isLoading || !resumes.data ?
                        <Grid item xs={12} style={{padding: "12px"}}>
                            <span style={{
                                fontWeight: "500"
                            }}>My resume (0)
                            </span>
                        </Grid> :
                        <>
                            <Grid item xs={12}>
                                <span style={{
                                    fontWeight: "500"
                                }}>My resume ({resumes.data.data.length})
                                </span>
                            </Grid>
                            {resumes.data.data.map((value, index) => {
                                return (
                                    <Grid item xs={12} key={index}>
                                        <Card elevation={0} sx={{display: 'flex'}} style={{width:333, height: 74,border:"1px solid #ececec"}} component="span">
                                            <CardMedia
                                                component="img"
                                                sx={{width: 34, height: 42}}
                                                image={"https://files.wondercv.com/PC/cvs/myresume_red.png"}
                                                alt="Live from space album cover"
                                                style={{margin: "10px"}}
                                            />
                                                <CardContent sx={{flex: '1 0 auto'}}>
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={10}>
                                                            <Typography component="div" variant="h8" style={{fontSize:"14px",fontWeight:"500",color:"#404040"}}>
                                                                {value.resumeName}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={2} style={{textAlign:"right", padding:"0px"}}>
                                                            <IconButton aria-label="more" size="large" style={{padding:"0px"}}
                                                                        id="basic-button"
                                                                        aria-controls={open ? 'basic-menu' : undefined}
                                                                        aria-haspopup="true"
                                                                        aria-expanded={open ? 'true' : undefined}
                                                                        onClick={handleClick}
                                                            >
                                                                <MoreHorizIcon fontSize="inherit"/>
                                                            </IconButton>
                                                            <Menu
                                                                id="basic-menu"
                                                                anchorEl={anchorEl}
                                                                open={open}
                                                                onClose={handleClose}
                                                                MenuListProps={{
                                                                    'aria-labelledby': 'basic-button',
                                                                }}
                                                            >
                                                                <MenuItem onClick={handleClose}>
                                                                    <ListItemIcon>
                                                                        <EditIcon fontSize="small" />
                                                                    </ListItemIcon>
                                                                    <ListItemText>
                                                                        Edit name
                                                                    </ListItemText>
                                                                </MenuItem>
                                                                <MenuItem onClick={handleClose}>
                                                                    <ListItemIcon>
                                                                        <FileDownloadIcon fontSize="small" />
                                                                    </ListItemIcon>
                                                                    <ListItemText>
                                                                        Download resume
                                                                    </ListItemText>
                                                                </MenuItem>
                                                                <MenuItem onClick={handleClose}>
                                                                    <ListItemIcon>
                                                                        <DeleteIcon fontSize="small" />
                                                                    </ListItemIcon>
                                                                    <ListItemText>
                                                                        Delete resume
                                                                    </ListItemText>
                                                                </MenuItem>
                                                            </Menu>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </>
                    }
                </Grid>
            </Paper>
        </Box>
    )
}