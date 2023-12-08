import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Items from '../pages/Items';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <SignUp />,
            },
            {
                path: '/signin',
                element: <SignIn/>
            },
            {
                path: '/items',
                element: <Items/>
            }
        ]
    },
]);

export default routes;