import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import ListItemText from "@mui/material/ListItemText";
import EditNameDialog from "./EditNameDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import {HomePageDownloadLink} from "../ResumeTemplate";

export default function ResumeMenu({
                                       value,
                                       handleDialogClickOpen,
                                       dialogOpen,
                                       setDialogOpen,
                                       newResumeName,
                                       setFinalName,
                                       sendDeleteResume,
                                       deleteUpdateTrigger,
                                       setDeleteUpdateTrigger
                                   }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const {
        resumeName,
        eduInfo,
        projectInfo,
        workLocation,
        otherSkills,
        photoUrl,
        orgInfo,
        phoneNum,
        profSkills,
        userName,
        email
    } = value
    let jsonValue = {
        resumeName,
        eduInfo: JSON.parse(eduInfo),
        projectInfo: JSON.parse(projectInfo),
        workLocation,
        otherSkill: otherSkills,
        photoUrl,
        orgInfo: JSON.parse(orgInfo),
        phoneNum,
        profSkills,
        userName,
        email
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteResume = async () => {
        const {ready} = sendDeleteResume(value.id)
        try {
            const response = await ready();
            setDeleteUpdateTrigger(!deleteUpdateTrigger)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <IconButton aria-label="more" size="large" style={{padding: "0px"}}
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
                <MenuItem onClick={handleDialogClickOpen}>
                    <ListItemIcon>
                        <EditIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>
                        Edit name
                    </ListItemText>
                </MenuItem>
                <EditNameDialog id={value.id} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}
                                newResumeName={newResumeName} setFinalName={setFinalName}/>
                <HomePageDownloadLink profile={jsonValue}/>
                <MenuItem onClick={handleDeleteResume}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>
                        Delete resume
                    </ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}
