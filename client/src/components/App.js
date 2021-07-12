import './app.scss'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

function App() {

    return (
        <BrowserRouter>
            <div className="app">
                <div className="wrap">
                    <Routes>
                        <Route path={'/registration'} element={<Registration/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
