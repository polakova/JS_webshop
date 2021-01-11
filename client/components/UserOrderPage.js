import React from 'react';

class UserOrderPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', street: '', house_number: '', city: '', zipcode: ''};
    
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStreetChange = this.handleStreetChange.bind(this);
        this.handleHouseNumberChange = this.handleHouseNumberChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleZipcodeChange = this.handleZipcodeChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleStreetChange(event) {
        this.setState({street: event.target.value});
    }

    handleHouseNumberChange(event) {
        this.setState({house_number: event.target.value});
    }
    
    handleCityChange(event) {
        this.setState({city: event.target.value});
    }

    handleZipcodeChange(event) {
        this.setState({zipcode: event.target.value});
    }

    handleSubmit() {
        this.props.onPurchase(this.state);
    }

    render() {
        return (
            <div className="container">
                <br />
                <form>
                    <div className="form-group">
                        <label for="inputName">Meno</label>
                        <input type="text" className="form-control" id="inputName" placeholder="Táňa" value={this.state.name} onChange={this.handleNameChange} />
                    </div>
                    <div className="form-group">
                        <label for="inputStreet">Ulica</label>
                        <input type="text" className="form-control" id="inputStreet" placeholder="M. R. Štefánika" value={this.state.street} onChange={this.handleStreetChange} />
                    </div>
                    <div className="form-group">
                        <label for="inputHouseNumber">Číslo domu</label>
                        <input type="text" className="form-control" id="inputHouseNumber" placeholder="64" value={this.state.house_number} onChange={this.handleHouseNumberChange} />
                    </div>
                    <div className="form-group">
                        <label for="inputCity">Mesto</label>
                        <input type="text" className="form-control" id="inputCity" placeholder="Bratislava" value={this.state.city} onChange={this.handleCityChange} />
                    </div>
                    <div className="form-group">
                        <label for="inputZipcode">PSČ</label>
                        <input type="text" className="form-control" id="inputZipcode" placeholder="94088" value={this.state.zipcode} onChange={this.handleZipcodeChange} />
                    </div>
                </form>
                <a href="#/thankyou">
                    <button onClick={this.handleSubmit} className="btn btn-dark btn-block">Kúpiť</button>
                </a>
            </div>
        );
    }
}

export default UserOrderPage;