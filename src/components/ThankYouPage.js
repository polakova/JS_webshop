import React from 'react';

class ThanYouPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            image: []
        };
    }

    componentDidMount(){
        fetch('/banner')
            .then(result => {
                return result.json();
            })
            .then(jsonResult => {
                this.setState({image: jsonResult.image});
            })
        .catch(err => console.log(err));
    }

    click = () => {
        fetch('/banner/clicked')
        .catch(err => console.log(err));
    }

    render (){
        return (
            <div className="container">
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Hotovo!</h4>
                    <p>Ďakujeme za Váš nákup.</p>
                    <hr />
                    <img className="img-fluid" src={this.state.image} onClick={this.click}></img>
                </div>
            </div>
        ); 
    }
}

export default ThanYouPage;