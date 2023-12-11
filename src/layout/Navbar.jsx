import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
const Navbar = () => {
    const email = Cookies.get('email');
    const logout = () => {
        Cookies.remove('email')
        Cookies.remove("accessToken")
        window.location.href = '/signin'
    }
    return (
        <div className='lg:px-32 md:px-8 md:py-4 px-4 py-2 bg-bg shadow-lg flex items-center justify-between font-poppins'>
            <Link to='/'> <h2 className='lg:text-3xl md:text-xl text-md font-semibold text-primary  w-full'>Arraytics</h2> </Link>

            <div className='flex items-center gap-x-4'>
                <Link to='/' className='lg:text-lg md:text-lg text-md font-semibold text-primary hover:text-secondary w-full text-end'>Items</Link>
               {email === undefined || email === null ? (
                    <Link to='/signin' onClick={logout} className='btn btn-outline btn-primary'>Signin</Link>
               ) : (
                        <button onClick={logout} className='btn btn-outline btn-primary'>
                            logout
                        </button>
               )}
           </div>
        </div>
    );
};

export default Navbar;