import Cookies from "js-cookie";
import ItemsComp from "../components/ItemsComp";

const Items = () => {
    const email = Cookies.get('email');
    if(email === undefined || email === null || !email) {
        window.location.href = '/signin'
    }
    return (
        <div>
            <ItemsComp/>
        </div>
    );
};

export default Items;