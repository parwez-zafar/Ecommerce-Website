import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, updateUserPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
// import Loader from '../layout/Loader/Loader';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import './updatePassword.css'
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';


const UpdatePassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, isUpdated, loading } = useSelector((state) => state.profile)

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");


    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();


        myForm.set('oldPassword', oldPassword);
        myForm.set('newPassword', newPassword);
        myForm.set('confirmNewPassword', confirmNewPassword);

        dispatch(updateUserPassword(myForm))
    }



    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Profile Updated Successfully")
            navigate('/account')
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch, error, alert, isUpdated, navigate]);




    return (





        <Fragment>
            {
                loading ?
                    <Loader />
                    :
                    <Fragment>
                        <MetaData title="Change Password" />
                        <div className="updatePasswordContainer">
                            <div className="updatePasswordBox">
                                <h2 className='updatePasswordHeading' >Update Profile</h2>
                                <form
                                    className="updatePasswordForm"
                                    encType='multipart/form-data'
                                    onSubmit={updatePasswordSubmit}
                                >
                                    <div className="signUpPassword">
                                        <VpnKeyIcon />
                                        <input type="password"
                                            placeholder='Old Password'
                                            required
                                            name='password'
                                            value={oldPassword}
                                            onChange={((e) => setOldPassword(e.target.value))}
                                        />
                                    </div>

                                    <div className="signUpPassword">
                                        <LockOpenIcon />
                                        <input type="password"
                                            placeholder='New Password'
                                            required
                                            name='password'
                                            value={newPassword}
                                            onChange={((e) => setNewPassword(e.target.value))}
                                        />
                                    </div>

                                    <div className="signUpPassword">
                                        <LockIcon />
                                        <input type="password"
                                            placeholder='Confirm Password'
                                            required
                                            name='password'
                                            value={confirmNewPassword}
                                            onChange={((e) => setConfirmNewPassword(e.target.value))}
                                        />
                                    </div>


                                    <input type="submit"
                                        value="Change"
                                        className='updatePasswordBtn'
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

export default UpdatePassword