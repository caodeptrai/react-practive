import { Table } from 'react-bootstrap'
import './TableUsers.scss'
import { useEffect, useState } from 'react'

import { fetchUserData } from '../../services/UserServices'
const TableUsers = () => {
    const [listUser, setListUser] = useState([])
    useEffect(() => {
        //call api
        getUser();
    }, [])

    const getUser = async () => {
        let result = await fetchUserData();
        if (result && result.data) {
            setListUser(result.data);
        }

    }

    console.log(listUser)
    return (
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
    )
}

export default TableUsers