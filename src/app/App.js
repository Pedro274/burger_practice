import React, {lazy, Suspense} from 'react';
import Layout from '../components/layout/Layout';
import BurgerBuilder from '../containers/burgerBuilder/BurgerBuilder';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Spinner from '../components/UI/spinner/Spinner';
import Orders from '../containers/orders/Orders';

const Checkout = lazy(() => import ('../containers/checkout/Checkout'))

function App() {
    return (
        <div className="App">
            <Router basename='/'>
                <Layout>
                    <Switch>
                        <Route path='/checkout' render={() => (
                        <Suspense fallback={<div><Spinner/></div>}>
                            <Checkout />
                        </Suspense>)}/>
                        <Route path='/orders' component={Orders}/>
                        <Route path='/' component={BurgerBuilder} exact/>
                        <Route
                            render={() => <h1
                            style={{
                            textAlign: "center"
                        }}>Sorry page not found</h1>}/>
                    </Switch>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
