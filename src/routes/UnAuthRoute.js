import { useSelector } from 'react-redux';
import { store } from '../reduxStore';
import { useLocation } from 'react-router-dom';
import { pageNotFound } from '../assets/constants/pageurl';

function UnAuthRoute({ children }) {
  const userData = store?.getState()?.app?.token;
  const { userDetails } = useSelector(state => state.app);
  const location = useLocation();

  if (userData && userData !== '' && userDetails !== '') {
    if (userDetails?.is_login == 1 && location.pathname != pageNotFound)
      window.location.href = '/dashboard';
  }
  return children;
}

export default UnAuthRoute;
