import { useEffect, useState } from 'react'
import './Login.scss'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { handleLoginRedux } from '../../redux/actions/userAction';


const Login = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const isLoading = useSelector(state => state.user.isLoading)
    const account = useSelector(state => state.user.account)

    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        let token = localStorage.getItem("token")
        if (token) {
            navigate("/")
        }
    }, [navigate])


    const handleLogin = async () => {

        if (!email || !password) {
            toast.error("email/password is required!")
            return
        }
        dispatch(handleLoginRedux(email, password))
    }


    const handlePressEnter = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin()
        }
    }


    console.log("check acccount,", account)
    useEffect(() => {
        if (account && account.auth === true) {
            navigate("/")
        }
    }, [account])


    return (
        <div className="login-container">
            <div className="login-form">

                <h3 className='title'>Login</h3>
                <span className='text'>User or email (eve.holt@reqres.in)</span>
                <input
                    type="text"
                    placeholder="Enter your user or email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <div className='input-wrapper'>
                    <input
                        type={isShowPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => handlePressEnter(event)}
                    />
                    <i className={isShowPassword === true ? 'password-icon fa-regular fa-eye-slash' : 'password-icon fa-regular fa-eye'} onClick={() => setIsShowPassword(!isShowPassword)}></i>
                    {/* {
                        isShowPassword ? 
                            (<i className="password-icon fa-regular fa-eye-slash" onClick={() => setIsShowPassword(false)}></i>) :
                            (<i className="password-icon fa-regular fa-eye" onClick={() => setIsShowPassword(true)}></i>)
                    } */}

                </div>

                <button
                    className={(email && password) ? 'btn btn-danger' : 'btn-login'}
                    disabled={(email && password) ? false : true}
                    onClick={() => handleLogin()}
                >
                    {isLoading && <i className="fas fa-spinner fa-spin"></i>}

                    <span className='ms-2'>Login</span>
                </button>
                <div className='go-back'>

                    <i className="fa-solid fa-arrow-left"></i>
                    <span> Go back</span>
                </div>
            </div>
        </div>
    )
}

export default Login
