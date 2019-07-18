import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ViewProductsContainer from './containers/ViewProductsContainer';
import CreateProductContainer from './containers/CreateProductContainer';
import ViewProductContainer from './containers/ViewProductContainer';
import Footer from './components/Footer/Footer';



function App() {
  return (
    <Router>
      <NavBar />
      <section className="pb-70px">
        <div className="container">
            <div className="cols">
              <div className="col-12">
                <Switch>
                  <Route path="/products" exact component={ViewProductsContainer} />
                  <Route path="/create-product" exact component={CreateProductContainer} />
                  <Route path="/product/:id" exact component={ViewProductContainer} />
                  <Redirect from="/" to="products" />
                </Switch>
              </div>
            </div>
        </div>
      </section>
      <Footer />
    </Router>
  );
}

export default App;
