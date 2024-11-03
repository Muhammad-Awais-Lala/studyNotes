import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle'
import Routes from './pages/Routes'
import ScreenLoader from 'components/ScreenLoader';
import { useAuthContext } from 'contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
function App() {

  const { isAppLoading } = useAuthContext()
  
  if (isAppLoading){
    return <ScreenLoader />
  }

  return (
    <>
      <Routes />
      
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light">

      </ToastContainer>
    </>
  );
}

export default App;
