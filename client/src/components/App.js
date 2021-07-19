import Navbar from "./navbar/Navbar";
import './app.scss'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Registration from "./pages/autorization/Registration";
import Login from "./pages/autorization/Login";

function App() {

    return (
        <BrowserRouter>
            <div className="app">
				<Navbar/>
                <div className="wrap">
                    <Routes>
                        <Route path={'/registration'} element={<Registration/>}/>
						<Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
