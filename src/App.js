import React, { useEffect, useCallback, lazy, Suspense } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// actions
import * as actions from './store/actions/index'

//components
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'

// lazy components
const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth = lazy(() => import('./containers/Auth/Auth'));

const App = props => {

  // STATE
  const isAuth = useSelector(state => state.auth.token !== null)

  // DISPATCH
  const dispatch = useDispatch();
  const onTryAutoSignUp = useCallback(() => dispatch(actions.authCheckState()), [dispatch])

  useEffect(() => { onTryAutoSignUp() }, [onTryAutoSignUp])

  // PRERENDER
  let routes = (
    <Switch>
      <Route path='/auth'
        render={() =>
          <Auth {...props} />} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>
  )

  if (isAuth) {
    routes = (
      <Switch>
        <Route path='/checkout'
          render={() =>
            <Checkout {...props} />} />
        <Route path='/orders'
          render={() =>
            <Orders {...props} />} />
        <Route path='/auth'
          render={() =>
            <Auth {...props} />} />
        <Route path='/logout' component={Logout} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )
  }
  return (
    <div>
      <Layout>
        <Suspense
          fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div >
  );

}

export default withRouter(App);
