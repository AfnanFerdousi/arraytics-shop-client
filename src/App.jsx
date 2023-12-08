import { ToastContainer } from 'react-toastify';
import MainLayout from './layout/MainLayout';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div>
      <MainLayout />
      <ToastContainer />
    </div>
  )
}

export default App
