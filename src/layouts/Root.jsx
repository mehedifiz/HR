
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const Root = () => {
    const location = useLocation();
  const isLoginPage = location.pathname.includes('payment')
    return (
        <div>
            {isLoginPage || <Navbar></Navbar>}
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;