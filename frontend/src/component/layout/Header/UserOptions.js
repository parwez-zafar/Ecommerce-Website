import React, { Fragment, useState } from 'react'
import "./header.css";
import { Backdrop, SpeedDial, SpeedDialAction } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { useDispatch } from 'react-redux';



function UserOptions({ user }) {

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();


    const dashboard = () => {
        navigate('/dashboard')
    }
    const orders = () => {
        navigate('/orders')
    }

    const account = () => {
        navigate("/account")
    }
    const logoutUser = async () => {
        await dispatch(logout());
        alert.success("Logout Successfully")
        console.log("okey");
        navigate('/login')

    }



    const [open, setOpen] = useState(false);
    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser }
    ]
    // console.log(user);
    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard
        })
    }







    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: '10' }} />
            <SpeedDial
                ariaLabel='SpeedDial tooltip example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction='down'
                className='speedDial'
                icon={
                    <img
                        className='speedDialIcon'
                        src={user.avatar.url ? user.avatar.url : "Profile.png"}
                        alt='Profile'
                    />
                }
            >
                {/* <SpeedDialAction icon={<DashboardIcon />} tooltipTitle="Dashboard" /> */}

                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                    />
                ))}

            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions