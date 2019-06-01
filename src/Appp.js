import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { global_url } from './env.js';
import Pagination from "./components/Pagination";
import './Appp.css';


class Appp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drugs: [],
            displayedItems:[],
            pageOfItems: [],
        };

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }

    componentDidMount() {
        axios.get(global_url + '/drugs')
            .then(res => {
                this.setState({ drugs: res.data });
                this.setState({ displayedItems: res.data });
            });
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            DRUGS LIST
                        </h3>
                    </div>
                    &emsp;
                    <div class="panel-body">
                        <h4><Link to="/create"  className="h-color" ><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>Add Drug</Link></h4>

                        {this.state.pageOfItems.map(c =>
                            <div className="bordered">
                                <div className="floating"><Link to={`/show/${c.id}`}><b>{c.name}</b></Link></div>
                                <div className="floating-margin">{c.ingredients.map(i => <small><Link to={`/showIngredient/${i.id}`}>{i.name + ".  "}</Link></small>)}</div>
                            </div>
                        )}
                        &emsp;
                        <Pagination items={this.state.drugs} onChangePage={this.handlePageChange} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Appp;
