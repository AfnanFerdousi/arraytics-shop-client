import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div className='lg:px-32 md:px-8 md:py-6 px-4 py-2 bg-bg shadow-lg flex items-center justify-between font-poppins'>
            <Link to='/'> <h2 className='lg:text-3xl md:text-xl text-md font-semibold text-primary  w-full'>Arraytics</h2> </Link>

            <Link to='/' className='lg:text-lg md:text-lg text-md font-semibold text-primary hover:text-secondary w-full text-end'>Items</Link>
        </div>
    );
};

export default Navbar;