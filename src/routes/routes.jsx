import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import SignUp from '../pages/SignUp';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <SignUp />,
            },
        ]
    },
]);

export default routes;