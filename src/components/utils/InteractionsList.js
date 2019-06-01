import React, { Component } from 'react';

class InteractionsList extends Component{
    render () {
        return (
            <div className="container">
                <ul className="list-group text-center">
                    {
                        Object.keys(this.props.interactions).map(function(key) {
                            return <li className="list-group-item list-group-item-info">{this.props.interactions[key]}</li>
                        }.bind(this))
                    }
                </ul>
            </div>
        );
    }
}

export default InteractionsList;