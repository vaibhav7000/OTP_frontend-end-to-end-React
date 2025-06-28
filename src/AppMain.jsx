import { useNavigate } from 'react-router'
import './App.css'
import AppRoutes from './Routes/Routes'
import { useEffect } from 'react';

// our application currently does not maintain the login state => whenever coming to application user has to login via otp send on the email

function AppMain() {
    const navigate = useNavigate(); // this hook helps to programatically go to the next route
    // but when using this be carefully because it has to be used inside he BrowserRouter 

    useEffect(() => {
        navigate("login");

    }, []);
    return (
        <AppRoutes/>
    )
}

export default AppMain
