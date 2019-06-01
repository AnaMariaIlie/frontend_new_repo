import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { global_url } from '../env.js'

class Show extends Component {


    constructor(props) {
        super(props);
        this.state = {
            drug: {ingredients: []}
        };
    }

    componentDidMount() {

        axios.get(global_url + '/drug/' + this.props.match.params.id)
            .then(res => {
                this.setState({ drug: res.data });
                console.log(this.state.drug);
            });
    }

    delete(id){
        console.log(id);
        axios.delete(global_url + '/drug/'+id)
            .then((result) => {
                this.props.history.push("/")
            });
    }

    render() {
        console.log("Here" + this.state.drug.ingredients);
        //<dd>{this.state.drug.ingredients.map(i=> <div>{i.name}</div>)}</dd>
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            Drug Details
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Drugs List</Link></h4>
                        <dl>
                            <dt>Name:</dt>
                            <dd>{this.state.drug.name}</dd>
                            <dt>Ingredients:</dt>
                            <dd>{this.state.drug.ingredients.map(i=> <small><Link to={`/showIngredient/${i.id}`}>{i.name + ". "}</Link></small>)}</dd>
                        </dl>
                        <Link to={`/edit/${this.state.drug.id}`} class="btn btn-success">Edit</Link>&nbsp;
                        <button onClick={this.delete.bind(this, this.state.drug.id)} class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Show;