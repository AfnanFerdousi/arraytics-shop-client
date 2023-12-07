import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div className='lg:px-32 md:px-8 md:py-4 px-4 py-2 bg-bg flex items-center justify-between'>
            <Link to='/'> <h2>Arraytics</h2> </Link>

            <Link to='/user' className='lg:text-xl md:text-lg text-md font-semibold underline text-primary hover:text-secondary w-full text-end'>User</Link>
            <Link to='/' className='lg:text-xl md:text-lg text-md font-semibold underline text-primary hover:text-secondary w-full text-end'>Items</Link>
        </div>
    );
};

export default Navbar;