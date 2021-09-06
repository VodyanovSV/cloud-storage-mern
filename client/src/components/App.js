import Navbar from "./navbar/Navbar";
import './app.scss'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Registration from "./pages/autorization/Registration";
import Login from "./pages/autorization/Login";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {authUser} from "../actions/authUser";
import Disk from "./pages/disk/Disk";
import Profile from "./profile/Profile";

function App() {
	const isAuth = useSelector(state => state.userReduser.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(authUser())
        }
    }, [])
	
    return (
        <BrowserRouter>
            <div className="app">
				<Navbar/>
                <div className="wrap">
                    {
                        !isAuth ?
                            <Routes>
                                <Route path={'/registration'} element={<Registration/>}/>
                                <Route path={'/login'} element={<Login/>}/>
                                <Route path={'*'} element={<Navigate to={'/login'}/>}/>
                            </Routes>
                            :
                            <Routes>
                                <Route exact path={'/'} element={<Disk/>}/>
								<Route exact path={'/profile'} element={<Profile/>}/>
                                <Route path={'*'} element={<Navigate to={'/'}/>}/>
                            </Routes>
                    }
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
