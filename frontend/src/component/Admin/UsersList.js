import React, { Fragment, useEffect } from 'react';
import './productList.css'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import Loader from '../layout/Loader/Loader';
import { clearErrors, deleteUser, getAllUsers } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';

const UsersList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { loading, error, users } = useSelector((state) => state.allUsers);
    const { error: deleteError, isDeleted, message } = useSelector((state) => state.profile)

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))

    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success(message)
            navigate('/admin/users');
            dispatch({ type: DELETE_USER_RESET })
        }
        dispatch(getAllUsers());
    }, [dispatch, error, alert, deleteError, isDeleted, navigate, message])

    const columns = [
        { field: "id", headerName: "User ID", minWidth: 200, flex: 0.8 },

        {
            field: "email",
            headerName: "Email",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },

        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 270,
            flex: 0.3,
            renderCell: (params) => {
                const cellClassName = params.row.role === 'admin' ? 'greenColor' : 'redColor';

                return (
                    <div className={cellClassName}>
                        {params.value}
                    </div>
                );
            },
        },
        {
            field: 'action',
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/user/${params.row.id}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() => deleteUserHandler(params.row.id)}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            }
        }
    ]


    let rows = [];
    users &&
        users.forEach((item, index) => {
            rows.push({
                id: item._id,
                email: item.email,
                name: item.name,
                role: item.role,
            });
        });


    return (
        <Fragment>
            <MetaData title={`ALL USERS - Admin`} />

            {
                loading ?
                    <Loader />
                    :
                    <Fragment>
                        <div className="dashboard">
                            <Sidebar />
                            <div className="productListContainer">
                                <h1 id="productListHeading">ALL USERS</h1>

                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={10}
                                    disableSelectionOnClick
                                    className="productListTable"
                                    // initialState={{

                                    //     pagination: { paginationModel: { pageSize: 5 } },
                                    // }}
                                    pageSizeOptions={`[5, 10, 25]`}
                                />
                            </div>
                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}


export default UsersList