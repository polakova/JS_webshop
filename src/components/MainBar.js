// HTML dizajn prevzaty od https://startbootstrap.com/snippets/navbar-logo
import React from 'react';

function MainBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
           
                <a className="navbar-brand" href="#">
                    <img src="http://placehold.it/150x50?text=Logo" alt="" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Domov</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#/basket">Košík</a>
                        </li>
                    </ul>
                </div>
      
        </nav>
    );
}

const styles = {
    basket: {
        marginLeft: '390px'
    }
  }

export default MainBar;