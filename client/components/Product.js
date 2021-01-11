// HTML dizajn prevzaty od https://getbootstrap.com/docs/4.0/examples/album/#
import React from 'react';

class Product extends React.Component {
    constructor(props){
        super(props);
    }

    toOrder = () => {
        this.props.toOrder(this.props.product);
    }

    toBasket = () => {
        this.props.toBasket(this.props.product);
    }

    render(){
        return (
            <div className="col-md-4">
                <div className="card mb-4 box-shadow">
                    <img src={this.props.product.image} alt="Product" className="card-img-top" style={styles.img} data-holder-rendered="true"/>
                    <div className="card-body">
                        <p className="card-text text-center">{this.props.product.name}</p>
                        <p className="font-weight-bold text-center">{this.props.product.cost}€</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <a href="#/basket">
                                    <button type="button" onClick={this.toOrder} className="btn btn-dark btn-block">Prejsť k objednávke</button>
                                </a>
                                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.toBasket}>Vložiť do košíka</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    img: {
        height: '250px', 
        width: '100%',
        display: 'block'
    }
  }

export default Product;