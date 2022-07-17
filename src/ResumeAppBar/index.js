import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link as NaviLink, useNavigation} from 'react-navi';
import {useContext, useState} from "react";
import {UserContext} from "../context";
import {DownloadLink} from "../ResumeTemplate";
import EditIcon from '@mui/icons-material/Edit';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Modal } from 'antd';
import TextField from "@mui/material/TextField";
import {useInput} from "react-hookedup";



const ResumeAppBar = (props) => {

    const {profile,resumeName,setResumeName} = props
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigation = useNavigation()
    // const printDocument = props.printDocument
    const {user, userDispatch} = useContext(UserContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const resumeInput = useInput("")


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setResumeName(resumeInput.value)
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleNavi = () => {
        navigation.navigate("/sign-in");
    }

    const handleLogout = () => {
        userDispatch({type: "LOGOUT"})


    };


    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            }, children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    function handleCloseUserMenu() {
        setAnchorElUser(null);
    }

    return (<AppBar position="static" style={{backgroundColor: "black"}}>

        <Container maxWidth="xl">

            <Toolbar disableGutters>
                <Button variant="text" startIcon={<ChevronLeftIcon/>} style={{color: "white"}} onClick={()=>navigation.goBack()}>
                    Back
                </Button>
                <Button variant="text" startIcon={<EditIcon/>} style={{color: "white",marginLeft:"1%"}} onClick={showModal}>
                    {resumeName.length === 0? "Edit name":resumeName}
                </Button>
                <Modal title="Edit Resume Name" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <TextField {...resumeInput.bindToInput} id="standard-basic" label="Name" variant="standard"/>
                </Modal>

                {/*<AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>*/}
                {/*<Typography*/}
                {/*    variant="h6"*/}
                {/*    noWrap*/}
                {/*    component="a"*/}
                {/*    sx={{*/}
                {/*        mr: 2,*/}
                {/*        display: {xs: 'none', md: 'flex'},*/}
                {/*        fontFamily: 'monospace',*/}
                {/*        fontWeight: 700,*/}
                {/*        letterSpacing: '.3rem',*/}
                {/*        color: 'inherit',*/}
                {/*        textDecoration: 'none',*/}
                {/*    }}*/}
                {/*    onClick={() => navigation.navigate('/')}*/}
                {/*>*/}
                {/*    LOGO*/}
                {/*</Typography>*/}
                <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: {xs: 'block', md: 'none'},
                        }}
                    >
                    </Menu>
                </Box>
                {/*<Button variant="contained" onClick={printDocument} style={{*/}
                {/*    borderRadius: "40px",*/}
                {/*    background: "#ff3d3d",*/}
                {/*    height: "150%",*/}
                {/*    fontWeight: "550",*/}
                {/*    marginRight: "5em"*/}
                {/*}}> Download </Button>*/}

                {user.id && <Box sx={{flexGrow: 0}} style={{marginLeft: "60rem"}}>
                    <Button variant="contained" style={{
                        borderRadius: "40px",
                        background: "#ff3d3d",
                        height: "150%",
                        fontWeight: "550",
                        marginRight: "5em"
                    }}>
                        <DownloadLink profile={profile}/>
                    </Button>
                    <Tooltip title="Open settings">
                        <>
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}
                                        style={{color: "white", fontSize: "20px"}}>
                                <Avatar {...stringAvatar(user.username)} style={{marginRight: "10%"}}/>
                                {user.username.split(" ")[0]}
                            </IconButton>
                        </>
                    </Tooltip>
                    <Menu
                        sx={{mt: '45px'}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top', horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top', horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleLogout}>
                            <Typography textAlign="center">Log out</Typography>
                        </MenuItem>
                    </Menu>
                </Box>}
                {!user.id && <Box sx={{flexGrow: 0}} style={{marginLeft: "55rem"}}>
                    <Button variant="outlined" style={{
                        borderRadius: "40px",
                        height: "150%",
                        fontWeight: "550",
                        color: "white",
                        marginRight: "20px",
                        border: "1px solid #797b7e"
                    }} onClick={handleNavi}>Sign in</Button>
                    <NaviLink href={'/sign-up'} style={{textDecoration: "none"}}>
                        <Button variant="contained" style={{
                            borderRadius: "40px", background: "#ff3d3d", height: "150%", fontWeight: "550"
                        }}> Register </Button>
                    </NaviLink>

                </Box>}

            </Toolbar>
        </Container>
    </AppBar>);
};
export default ResumeAppBar;
