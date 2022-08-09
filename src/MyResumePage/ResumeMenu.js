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
import {useNavigation} from "react-navi";
import FormatPaintIcon from '@mui/icons-material/FormatPaint';

export default function ResumeMenu({
                                       value,
                                       handleDialogClickOpen,
                                       dialogOpen,
                                       setDialogOpen,
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
    const navigation = useNavigation()

    const handleClick = (event) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
        e.stopPropagation()
        setAnchorEl(null);
    };

    const handleDeleteResume = async (e) => {
        e.stopPropagation()
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
                <EditNameDialog resumeName={value.resumeName} id={value.id} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}
                                setFinalName={setFinalName}/>
                <MenuItem onClick={()=>navigation.navigate(`/cv/editor/${value.id}`)}>
                    <ListItemIcon>
                        <FormatPaintIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>
                        Edit resume
                    </ListItemText>
                </MenuItem>
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
