import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import PrivateRoutes from './PrivateRoutes';
import TableUsers from '../components/tableUsers/TableUsers';
import Error404 from '../pages/error/Error404';
const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='users' element={
                    <PrivateRoutes>
                        <TableUsers />
                    </PrivateRoutes>
                } />
                <Route path='*' element={<Error404 />} />
            </Routes>

        </>
    )
}

export default AppRoutes