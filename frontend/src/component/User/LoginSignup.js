import React, { Fragment, useRef, useState, useEffect } from 'react';
import './LoginSignup.css';
import { Link, useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, login, register } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';


const LoginSignup = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, loading, isAuthenticated } = useSelector((state) => state.user)
    let navigate = useNavigate();

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);


    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })
    const { name, email, password } = user;
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatartPreview] = useState("/Profile.png");

    const loginSubmit = (e) => {
        // console.log("login form submitted");
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword))
    }


    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('password', password);
        myForm.set('avatar', avatar);
        console.log(myForm);
        dispatch(register(myForm))
    }
    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatartPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);

        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate('/account')
        }
    }, [dispatch, error, alert, isAuthenticated, navigate]);

    const switchTab = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }

    }


    return (
        <Fragment>
            {
                loading ?
                    <Loader />
                    :
                    <Fragment>
                        <div className="LoginSignupContainer">
                            <div className="LoginSignupBox">
                                <div>
                                    <div className="login_signUp_toggle">
                                        <p onClick={(e) => switchTab(e, "login")}>LOGIN</p>
                                        <p onClick={(e) => switchTab(e, "register")}>REGISTER</p>
                                    </div>

                                    <button ref={switcherTab}></button>
                                </div>

                                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>

                                    <div className="loginEmai">
                                        <MailOutlineIcon />
                                        <input type="email"
                                            placeholder='Email'
                                            required
                                            value={loginEmail}
                                            onChange={(e) => setLoginEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="loginPassword">
                                        <LockOpenIcon />
                                        <input type="password"
                                            placeholder='Password'
                                            required
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                        />
                                    </div>

                                    <Link to='/password/forgot'>Forget Password</Link>
                                    <input type="submit"
                                        value="Login"
                                        className='loginBtn'
                                    />

                                </form>
                                <form
                                    className="signUpForm"
                                    ref={registerTab}
                                    encType='multipart/form-data'
                                    onSubmit={registerSubmit}
                                >

                                    <div className="signUpName">
                                        <FaceIcon />
                                        <input
                                            type="text"
                                            placeholder='Name'
                                            required
                                            name='name'
                                            value={name}
                                            onChange={registerDataChange}
                                        />
                                    </div>

                                    <div className="signUpEmail">
                                        <MailOutlineIcon />
                                        <input
                                            type="email"
                                            placeholder='Email'
                                            required
                                            name='email'
                                            value={email}
                                            onChange={registerDataChange}
                                        />
                                    </div>
                                    <div className="signUpPassword">
                                        <LockOpenIcon />
                                        <input type="password"
                                            placeholder='Password'
                                            required
                                            name='password'
                                            value={password}
                                            onChange={registerDataChange}
                                        />
                                    </div>

                                    <div id="registerImage">
                                        <img src={avatarPreview} alt="Avatar Preview" />
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={registerDataChange}
                                        />
                                    </div>
                                    <input type="submit"
                                        value="Register"
                                        className='signUpBtn'
                                    // disabled={loading ? true : false}
                                    />
                                </form>
                            </div>

                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}

export default LoginSignup