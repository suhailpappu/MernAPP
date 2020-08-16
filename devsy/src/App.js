import React,{Fragment,useEffect} from 'react';

import './styles/styles.scss';
import store from './store/store'
import {Provider} from 'react-redux'
import { AppRouter } from './router/AppRouter';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';


if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () =>{

  useEffect(() => {
    store.dispatch(loadUser())
  },[])
  
  return(
  <Provider store={store}>
    <Fragment>
      <AppRouter/>
    </Fragment>
  </Provider>
  
)}

export default App;
