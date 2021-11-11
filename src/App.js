import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'react-loading-skeleton/dist/skeleton.css'

import * as ROUTES from './constants/routes'
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';
import ProtectedRoute from './helpers/protected-route';

const Dashboard = lazy(() => import ('./pages/dashboard'));
const Login = lazy(() => import ('./pages/login'));
const SignUp = lazy(() => import ('./pages/signup'));
const Profile = lazy(() => import ('./pages/profile'));
const NotFound = lazy(() => import ('./pages/not-found'));


export default function App() {
    const user = useAuthListener()

    return (
        <UserContext.Provider value={{user}}>
            <Router>
                <Suspense fallback={<p>Loading...</p>}>
                    <Switch>
                        <Route path={ROUTES.LOGIN} component={Login}/>
                        <Route path={ROUTES.SIGN_UP} component={SignUp}/>
                        <Route path={ROUTES.PROFILE} component={Profile}/>
                        <ProtectedRoute 
                            user={user}
                            redirectPath={ROUTES.LOGIN}
                            path={ROUTES.DASHBOARD}>
                            <Dashboard />
                        </ProtectedRoute>
                        <Route component={NotFound}/>
                    </Switch>
                </Suspense>
            </Router>
        </UserContext.Provider>
    )
}