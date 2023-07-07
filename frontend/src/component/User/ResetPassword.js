import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, resetPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import './resetPassword.css'
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';




const ResetPassword = () => {



    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, success, loading } = useSelector((state) => state.forgotPassword)

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { token } = useParams();

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        console.log("token is ", token);

        const myForm = new FormData();


        myForm.set('password', password);
        myForm.set('confirmPassword', confirmPassword);
        // console.log(password, " ", confirmPassword);


        dispatch(resetPassword(token, myForm))
    }



    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password Updated Successfully")
            navigate('/login')
        }
    }, [dispatch, error, alert, success, navigate]);




    return (
        <Fragment>
            {
                loading ?
                    <Loader />
                    :
                    <Fragment>
                        <MetaData title="Reset Password" />
                        <div className="resetPasswordContainer">
                            <div className="resetPasswordBox">
                                <h2 className='resetPasswordHeading' >Reset Password</h2>
                                <form
                                    className="resetPasswordForm"
                                    encType='multipart/form-data'
                                    onSubmit={resetPasswordSubmit}
                                >


                                    <div>
                                        <LockOpenIcon />
                                        <input type="password"
                                            placeholder='New Password'
                                            required
                                            name='password'
                                            value={password}
                                            onChange={((e) => setPassword(e.target.value))}
                                        />
                                    </div>

                                    <div>
                                        <LockIcon />
                                        <input type="password"
                                            placeholder='Confirm Password'
                                            required
                                            name='password'
                                            value={confirmPassword}
                                            onChange={((e) => setConfirmPassword(e.target.value))}
                                        />
                                    </div>


                                    <input type="submit"
                                        value="Update"
                                        className='resetPasswordBtn'
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

export default ResetPassword