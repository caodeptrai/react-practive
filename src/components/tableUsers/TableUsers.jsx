import { Table } from 'react-bootstrap'
import './TableUsers.scss'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { fetchUserData } from '../../services/UserServices'
import ModalsAddNewUser from '../modals/ModalsAddNewUser'
import ModalEditUser from '../modals/ModalsEditUser'
import _ from 'lodash'
import ModalDeleteUser from '../modals/ModalDelete'
const TableUsers = () => {
    const [listUser, setListUser] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [isShowModalAddNewUser, setIsShowModalAddNewUser] = useState(false)
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false)
    const [dataUserEdit, setDataUserEdit] = useState({})
    const [dataUserDelete, setDataUserDetele] = useState({})
    const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false)
    const [sortBy, setSortBy] = useState("asc")
    const [sortField, setSortField] = useState("id")


    const handleOpenEditModal = (user) => {
        setDataUserEdit(user)
        //  handleEditUserFromModal(user)
        setIsShowModalEditUser(true)

    }

    const handleCloseEditModal = () => {
        setIsShowModalEditUser(false)
    }

    const handleClose = () => {
        setIsShowModalAddNewUser(false)
        setIsShowModalDeleteUser(false)
    }

    const handleOpen = () => {
        setIsShowModalAddNewUser(true)
    }


    const handleOpenDeleteModal = (user) => {
        setIsShowModalDeleteUser(true)
        setDataUserDetele(user)

    }

    const handleUpdateTable = (user) => {
        setListUser([user, ...listUser])
    }

    const handleEditUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUser)
        let index = listUser.findIndex(item => item.id === user.id)
        cloneListUser[index].first_name = user.first_name
        setListUser(cloneListUser)
    }

    const handleDeleteUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUser)
        cloneListUser = cloneListUser.filter(item => item.id !== user.id)
        setListUser(cloneListUser)
    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy)
        setSortField(sortField)
        let cloneListUser = _.cloneDeep(listUser)
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);

        setListUser(cloneListUser)

    }





    useEffect(() => {
        //call api
        getUser(1);
    }, [])

    const getUser = async (page) => {
        let result = await fetchUserData(page);
        if (result && result.data) {
            setTotalUsers(result.total)
            setTotalPages(result.total_pages)
            setListUser(result.data);
        }

    }



    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        getUser(+event.selected + 1)


    };
    return (
        <>
            <div className='my-3 d-flex justify-content-between align-items-center' >
                <strong>List User:</strong>
                <button className='btn btn-success' onClick={handleOpen}>Add new user</button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <div className='sort-header'>
                                <span>ID</span>
                                <span>
                                    <i className="fa-solid fa-arrow-up"
                                        onClick={() => handleSort("asc", "id")}
                                    ></i>
                                    <i className="fa-solid fa-arrow-down"
                                        onClick={() => handleSort("desc", "id")}
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>
                            <div className='sort-header'>
                                <span>First Name</span>
                                <span>
                                    <i className="fa-solid fa-arrow-up"
                                        onClick={() => handleSort("asc", "first_name")}
                                    ></i>
                                    <i className="fa-solid fa-arrow-down"
                                        onClick={() => handleSort("desc", "first_name")}
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>
                            Last Name

                        </th>
                        <th>
                            <div className='sort-header'>
                                <span>Email</span>
                                <span>
                                    <i className="fa-solid fa-arrow-up"
                                        onClick={() => handleSort("asc", "email")}
                                    ></i>
                                    <i className="fa-solid fa-arrow-down"
                                        onClick={() => handleSort("desc", "email")}
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 && listUser.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.email}</td>
                                <td>
                                    <button className='btn btn-warning m-2' onClick={() => handleOpenEditModal(item)}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => handleOpenDeleteModal(item)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}


                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousLinkClassName='page-link'
                previousClassName='page-item'
                nextClassName='page-iten'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-lin'
                containerClassName='pagination'
                activeClassName='active'
            />
            <ModalsAddNewUser
                show={isShowModalAddNewUser}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable} />
            <ModalEditUser
                show={isShowModalEditUser}
                handleCloseEditModal={handleCloseEditModal}
                dataUserEdit={dataUserEdit}
                handleEditUserFromModal={handleEditUserFromModal} />
            <ModalDeleteUser
                show={isShowModalDeleteUser}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />
        </>
    )
}

export default TableUsers