// 
import React from 'react';

import BasketProduct from './BasketProduct';

class BasketPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            basket: this.props.basket
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ basket: nextProps.basket });  
    }

    handlequantity = (product) => {
        if (product.quantity == 0) {
            let tmp_basket = this.state.basket;
            let index = tmp_basket.indexOf(product);

            tmp_basket.splice(index, 1);

            this.setState({basket: tmp_basket});
        }
        this.props.toBasket(product);
    }
    
    render() {
        const fullBasket = this.state.basket.length;
        let content_prod, content_sum;

        if (fullBasket) {
            content_prod = this.state.basket.map((product) => (
                <div>
                <BasketProduct key={product.id} toBasket={this.handlequantity} product={product}/>
                <hr className="mb" />
                </div>))

            content_sum = (
                <div className="row">
                    <a href="#/order">
                        <button type="button" className="btn btn-dark btn-block">Pokračovať k objednávke</button>
                    </a>
                </div>);
        }
        else {
            content_prod = <p>Košík je prázdny.</p>;
            content_sum = (<div className="row"></div>);
        }

        return (   
            <div className="container">    
                <div className="row">
                    <div className="col">
                        <div className="mb">
                            <div className="pt wish-list">
                                <br />
                                <h5 className="mb">Košík</h5>
                                <hr className="mb" />
                                {content_prod}
                            </div>
                        </div>
                    </div>
                </div>
                {content_sum}
            </div>
        );
    }
}

export default BasketPage;