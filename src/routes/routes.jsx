import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

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
            }
        ]
    },
]);

export default routes;