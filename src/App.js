import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

//actions
import * as actions from './store/actions/index'

//components
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'

// lazy components
const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth = lazy(() => import('./containers/Auth/Auth'));

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
  onTryAutoSignUp: () => dispatch(actions.authCheckState())
})
class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp()
  }

  render() {

    let routes = <Switch>

      <Route path='/auth'
        render={() =>
          <Suspense
            fallback={<div>Loading...</div>}>
            <Auth {...this.props} />
          </Suspense>
        } />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to='/' />
    </Switch>

    if (this.props.isAuth) {
      routes = <Switch>
        <Route path='/checkout'
          render={() =>
            <Suspense
              fallback={<div>Loading...</div>}>
              <Checkout {...this.props} />
            </Suspense>
          } />

        <Route path='/orders'
          render={() =>
            <Suspense
              fallback={<div>Loading...</div>}>
              <Orders {...this.props} />
            </Suspense>
          } />

        <Route path='/auth'
          render={() =>
            <Suspense
              fallback={<div>Loading...</div>}>
              <Auth {...this.props} />
            </Suspense>
          } />

        <Route path='/logout' component={Logout} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div >
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
