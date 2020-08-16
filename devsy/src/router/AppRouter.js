import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Landing from '../components/layout/Landing'
import  Login  from '../components/auth/Login'
import  Register  from '../components/auth/Register'
import  Navbar  from '../components/layout/Navbar'
import Alert from '../components/layout/Alert'
import Dashboard from '../components/dashboard/Dashboard'
import PrivateRoute from './PrivateRoute'
import CreateProfile from '../components/profile-forms/CreateProfile'
import EditProfile from '../components/profile-forms/EditProfile'
import AddExperience from '../components/profile-forms/AddExperience'
import AddEducation from '../components/profile-forms/AddEducation'
import Profiles from '../components/profiles/Profiles'
import Profile from '../components/profile/Profile'
import Posts from '../components/Posts/Posts'
import SinglePost from '../components/Posts/SinglePost'

export const AppRouter = () => (
    <BrowserRouter>
            <Navbar/>
            <Route path='/' exact component={Landing}/>
            <Alert/>
            <section className="container">
                <Switch>
                    <Route path='/login' exact component={Login}/>
                    <Route path='/register' exact component={Register}/>
                    <PrivateRoute path='/dashboard' exact component={Dashboard}/>
                    <PrivateRoute path='/create-profile' exact component={CreateProfile}/>
                    <PrivateRoute path='/edit-profile' exact component={EditProfile}/>
                    <PrivateRoute path='/add-experience' exact component={AddExperience}/>
                    <PrivateRoute path='/add-education' exact component={AddEducation}/>
                    <Route path='/profiles' exact component={Profiles}/>
                    <Route path='/profile/:id' exact component={Profile}/>
                    <PrivateRoute path='/posts' exact component={Posts}/>
                    <PrivateRoute path='/post/:id' exact component={SinglePost}/>
                </Switch>
            </section>
            
        
    
    </BrowserRouter>
)
 