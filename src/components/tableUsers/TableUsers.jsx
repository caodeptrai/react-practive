import { Table } from 'react-bootstrap'
import './TableUsers.scss'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { fetchUserData } from '../../services/UserServices'
const TableUsers = () => {
    const [listUser, setListUser] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
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
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
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
        </>
    )
}

export default TableUsers