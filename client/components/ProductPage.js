import React from 'react';
import Product from './Product';

class ProductPage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            products: []
        };
    }

    handleToOrder = (product) => {
        this.props.toOrder(product);
    }

    handleToBasket = (product) => {
        this.props.toBasket(product);
    }
    
    componentDidMount(){
        fetch('/home')
            .then(result => {
                return result.json();
            })
            .then(jsonResult => {
                this.setState({products: jsonResult.data});
            })
        .catch(err => console.log(err));
    }

    render() {
        return (
                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row">
                            { this.state.products.map((product) => (
                                <Product key={product.id} toOrder={this.handleToOrder} toBasket={this.handleToBasket} product={product} />))
                            }
                        </div>
                    </div> 
                </div>
        );
    }
}

export default ProductPage;