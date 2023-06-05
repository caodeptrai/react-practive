import { useState } from 'react'
import { Container } from 'react-bootstrap'
import './App.scss'
import Header from './components/header/Header'
import TableUsers from './components/tableUsers/TableUsers'
import ModalsAddNewUser from './components/modals/ModalsAddNewUser'
function App() {
  const [isShowModalAddNewUser, setIsShowModalAddNewUser] = useState(false)

  const handleClose = () => {
    setIsShowModalAddNewUser(false)
  }

  const handleOpen = () => {
    setIsShowModalAddNewUser(true)
  }

  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>
          <div className='my-3 d-flex justify-content-between align-items-center' >
            <strong>List User:</strong>
            <button className='btn btn-success' onClick={handleOpen}>Add new user</button>
          </div>
          <TableUsers />
        </Container>
        <ModalsAddNewUser show={isShowModalAddNewUser} handleClose={handleClose} />
      </div>
    </>
  )
}

export default App
