import React from 'react';

class AdminPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            orders: [],
            counter: 0
        };
    }

    componentDidMount(){
        fetch('/admin')
            .then(result => {
                return result.json();
            })
            .then(jsonResult => {
                this.setState({orders: jsonResult.orders, counter: jsonResult.counter});
            })
        .catch(err => console.log(err));
    }

    render(){
        return (
            <div className="container">
                <br />
                <p>
                    <span><strong>Počet kliknutí na reklamný banner: </strong></span>
                    <span>{this.state.counter}</span>
                </p>
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID objednávky</th>
                            <th scope="col">Zákazník</th>
                            <th scope="col">Stav objednávky</th>
                            <th scope="col">Produkt a množstvo</th>
                            <th scope="col">Produkt a množstvo</th>
                            <th scope="col">Produkt a množstvo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orders.map((order) => (
                            order.paid == "Vyplatené" ?
                                <tr className="table-success">
                                    <th scope="row">{order.order_id}</th>
                                    <td>{order.name}</td>
                                    <td>{order.paid}</td>
                                    { order.products.map((product) => (
                                    <td>
                                        {product.name},
                                        {product.quantity}ks
                                    </td>
                                    ))}
                                </tr>
                            :
                                <tr className="table-danger">
                                    <th scope="row">{order.order_id}</th>
                                    <td>{order.name}</td>
                                    <td>{order.paid}</td>
                                    { order.products.map((product) => (
                                    <td>
                                        {product.name},
                                        {product.quantity}ks
                                    </td>
                                    ))}
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ); 
    }
}

export default AdminPage;