import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, loadUser, updateUserProfile } from '../../actions/userAction';
import { useAlert } from 'react-alert';
// import Loader from '../layout/Loader/Loader';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import './updateProfile.css'
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { user } = useSelector((state) => state.user)
    const { error, isUpdated, loading } = useSelector((state) => state.profile)

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatartPreview] = useState("/Profile.png");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('avatar', avatar);
        console.log("form Data is ", myForm);
        dispatch(updateUserProfile(myForm))
    }
    const updateProfileDataChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatartPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);


    }

    useEffect(() => {
        if (user) {
            // console.log("setting");
            setName(user.name);
            setEmail(user.email);
            setAvatartPreview(user.avatar.url);
            // console.log(name, email, avatarPreview);
        }
        if (error) {
            console.log(error);
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Profile Updated Successfully")
            dispatch(loadUser());
            navigate('/account')
            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    }, [dispatch, error, alert, isUpdated, navigate, user]);

    return (
        <Fragment>
            {
                loading ?
                    <Loader />
                    :
                    <Fragment>
                        <MetaData title="Update Profile" />
                        <div className="updateProfileContainer">
                            <div className="updateProfileBox">
                                <h2 className='updateProfileHeading' >Update Profile</h2>
                                <form
                                    className="updateProfileForm"
                                    onSubmit={updateProfileSubmit}
                                >

                                    <div className="updateProfileName">
                                        <FaceIcon />
                                        <input
                                            type="text"
                                            placeholder='Name'
                                            required
                                            name='name'
                                            value={name}
                                            onChange={((e) => setName(e.target.value))}
                                        />
                                    </div>

                                    <div className="updateProfileEmail">
                                        <MailOutlineIcon />
                                        <input
                                            type="email"
                                            placeholder='Email'
                                            required
                                            name='email'
                                            value={email}
                                            onChange={((e) => setEmail(e.target.value))}
                                        />
                                    </div>


                                    <div id="updateProfileImage">
                                        <img src={avatarPreview} alt="Avatar Preview" />
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={updateProfileDataChange}
                                        />
                                    </div>
                                    <input type="submit"
                                        value="Update"
                                        className='updateProfileBtn'
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

export default UpdateProfile