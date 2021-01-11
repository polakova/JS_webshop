import React from 'react';

class BasketProduct extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            quantity: this.props.product.quantity
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ quantity: nextProps.product.quantity });  
    }

    plusquantity = () => {
        var result = Number(this.state.quantity) + 1;
        this.props.product.quantity = result;

        this.setState({quantity: result});

        this.props.toBasket(this.props.product);
    }

    minusquantity = () => {
        var result = Number(this.state.quantity) - 1;
        this.props.product.quantity = result;

        this.setState({quantity: result});

        this.props.toBasket(this.props.product);
    }

    render(){
        return (
            <div className="row">
                <div className="col-md-5 col-lg-3 col-xl-3">
                    <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                        <img className="img-fluid w-50" src={this.props.product.image} alt="Sample" /> 
                    </div>
                </div>
                <div className="col-md-7 col-lg-9 col-xl-9">
                    <div>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h5>{this.props.product.name}</h5>
                            </div>
                            <div>
                                <div className="def-number-input number-input mb-0 w-100">
                                    <button onClick={this.minusquantity} >-</button>
                                    <input value={this.state.quantity} />
                                    <button onClick={this.plusquantity} >+</button>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-0"><span><strong id="summary">{this.props.product.cost}€/ks</strong></span></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BasketProduct;