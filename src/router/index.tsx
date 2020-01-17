import { BrowserRouter as Router, Switch, Route, RouteProps, Redirect } from 'react-router-dom'
import React from 'react'
import { RootState } from '../store/reducer'
import { useSelector } from 'react-redux'
import Login from '../pages/Login'
import App from '../pages/App'

export const AuthRoute: React.FC<RouteProps> = props => {
  let { component, children, render, ...reset } = props
  const token = useSelector<RootState>(state => state.token)
  return <Route {...reset}>{token ? component || children : <Redirect to="/login" />}</Route>
}

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <AuthRoute path="/" component={App} />
      </Switch>
    </Router>
  )
}

export default Routes
