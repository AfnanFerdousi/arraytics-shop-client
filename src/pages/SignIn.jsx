import Cookies from 'js-cookie';
import Signin from '../components/Signin';

const SignIn = () => {
    const email = Cookies.get('email');
    if (email) {
        window.location.href = '/items'
    }
    return (
        <div>
            <Signin/>
        </div>
    );
};

export default SignIn;