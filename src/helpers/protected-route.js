import { Route, Redirect } from 'react-router-dom'

export default function ProtectedRoute({user, redirectPath, children, ...props}) {
    return (
        <Route 
            {...props}
            render={({location}) => {
                if (user) {
                    return children
                }
                if (!user) {
                    return <Redirect to={{
                        pathname: redirectPath,
                        state: { from: location }
                    }}/>
                }
                return null
            }}/>
    )
}