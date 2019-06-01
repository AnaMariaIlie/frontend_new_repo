import React, { Component } from 'react';

class ItemsList extends Component{
    render () {
        return (
            <div className="container">
                <ul className="list-group text-center">
                    {
                        Object.keys(this.props.ingredients).map(function(key) {
                            return <li className="list-group-item list-group-item-info">{this.props.ingredients[key]}</li>
                        }.bind(this))
                    }
                </ul>
            </div>
        );
    }
}

export default ItemsList;