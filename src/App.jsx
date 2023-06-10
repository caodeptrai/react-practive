
import { Container } from 'react-bootstrap'
import './App.scss'
import Header from './components/header/Header'
import TableUsers from './components/tableUsers/TableUsers'



import { ToastContainer } from 'react-toastify';
import Home from './pages/home/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
function App() {


  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<TableUsers />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Container>

      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />


    </>
  )
}

export default App
