import { Table } from 'react-bootstrap'
import './TableUsers.scss'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { fetchUserData } from '../../services/UserServices'
import ModalsAddNewUser from '../modals/ModalsAddNewUser'
import ModalEditUser from '../modals/ModalsEditUser'
import _, { debounce } from 'lodash'
import ModalDeleteUser from '../modals/ModalDelete'
import { CSVLink, CSVDownload } from "react-csv";
import Papa from 'papaparse'
import { toast } from 'react-toastify'
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
    const [dataExport, setDataExport] = useState([])



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

    const handleSearch = debounce((event) => {
        let term = event.target.value
        console.log("check seach run...", term)
        if (term) {
            let cloneListUser = _.cloneDeep(listUser)
            cloneListUser = cloneListUser.filter((el) => el.email.toLowerCase().includes(term.toLowerCase()))

            setListUser(cloneListUser)
        } else {
            getUser(1)
        }
    }, 300)

    const getUsersExport = (event, done) => {
        let result = []
        if (listUser && listUser.length > 0) {
            result.push(["ID", "First name", "Last name", "Email"]);
            listUser.map((item) => {
                let arr = []
                arr[0] = item.id;
                arr[1] = item.first_name;
                arr[2] = item.last_name;
                arr[3] = item.email;

                result.push(arr);
            })

            setDataExport(result)
            done();
        }
    }

    const handleImportCSV = (event) => {

        if (event.target && event.target.files && event.target.files[0]) {

            let file = event.target.files[0];

            if (file.type !== "text/csv") {
                toast.error("Vui lòng chọn đúng kiểu định dạng");
                return;
            }

            // Parse local CSV file
            Papa.parse(file, {
                // header: true,
                complete: function (results) {
                    let rawCSV = results.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (rawCSV[0][0] !== "first_name" || rawCSV[0][1] !== "last_name" || rawCSV[0][2] !== "email") {
                                toast.error("wrong fomat header CSV file!")
                            } else {
                                let result = [];
                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.first_name = item[0]
                                        obj.last_name = item[1]
                                        obj.email = item[2]

                                        result.push(obj)
                                    }
                                })

                                setListUser(result)
                            }
                        } else {
                            toast.error("Wrong format CSV file!")
                        }
                    } else {
                        toast.error("not found data on CSV file!")
                    }

                }
            });
        }


    }


    return (
        <>
            <div className='my-3 d-sm-flex justify-content-between align-items-center' >
                <strong>List User:</strong>
                <div>
                    <label htmlFor="test" className='btn btn-warning'>Import</label>
                    <input id='test' type="file" hidden onChange={(event) => handleImportCSV(event)} />

                    <CSVLink
                        data={dataExport}
                        filename={"my-file.csv"}
                        className="btn btn-primary mx-2"

                        asyncOnClick={true}
                        onClick={getUsersExport}
                    >Export</CSVLink>

                    {/* <CSVDownload data={csvData} target="_blank" /> */}
                    <button className='btn btn-success ' onClick={handleOpen}>Add new user</button>
                </div>

            </div>
            <div className='col-12 col-sm-5 col-xl-4 my-3'>
                <input
                    className='form-control'
                    type="search"
                    placeholder='search user by email...'
                    // value={keyword}
                    onChange={(event) => handleSearch(event)}
                />
            </div>
            <div className="table-responsive">

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
            </div>
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