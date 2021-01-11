import React from 'react';
import { Route, HashRouter } from "react-router-dom";

import MainBar from './MainBar';
import UserOrderPage from './UserOrderPage';
import ProductPage from './ProductPage';
import BasketPage from './BasketPage';
import AdminPage from './AdminPage';
import ThankYouPage from './ThankYouPage';

class Router extends React.Component {
    constructor(){
        super();
        this.state={
            basket: []
        };
    }

    componentDidMount() {
        fetch('/basket')
            .then(result => {
                return result.json();
            })
            .then(jsonResult => {
                this.setState({ basket: jsonResult.basket });
            })
        .catch(err => console.log(err));
    }

    sendUpdateBasket = (product) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product_id: product.id, quantity: product.quantity })
        };

        fetch('/order/basket/update', requestOptions);
    }

    handlePurchase = (user) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: user })
        };

        fetch('/order/user', requestOptions);

        this.setState({
            basket: []
        });
    }

    handleToOrder = (product) => {
        let in_basket = false;

        this.state.basket.forEach(basket_product => {
            if (basket_product.id == product.id) {
                in_basket = true;
            }
        });

        // ak produkt nie je este v kosiku
        if(!in_basket){
            product.quantity = 1;
            this.state.basket.push(product);
            
            this.sendUpdateBasket(product);
        }
    }

    handleToBasket = (product) => {
        let in_basket = false;

        this.state.basket.forEach(basket_product => {

            // ak je produkt v kosiku, navysi sa jeho pocet
            if (basket_product.id == product.id) {
                in_basket = true;
                basket_product.quantity += 1;
                product.quantity = basket_product.quantity;
            }
        });

        // ak produkt nie je v kosiku, prida sa tam
        if(!in_basket){
            product.quantity = 1;
            this.state.basket.push(product);
        }

        this.sendUpdateBasket(product);
    }

    // aktualizovane iba quantity
    handleToBasket_fromBasket = (product) => {
        this.sendUpdateBasket(product);
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <MainBar />      
                    <Route exact path="/" render={() => <ProductPage toOrder={this.handleToOrder} toBasket={this.handleToBasket} />} />
                    <Route path="/order" render={() => <UserOrderPage onPurchase={this.handlePurchase} />} />
                    <Route path="/basket" render={() => <BasketPage toBasket={this.handleToBasket_fromBasket} basket={this.state.basket} />} />
                    <Route path="/thankyou" component={ThankYouPage} />
                    <Route path="/admin" component={AdminPage} />
                </div>
            </HashRouter>
        );
    }
}

export default Router;