import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { global_url } from '../env.js'

class ShowIngredient extends Component {


    constructor(props) {
        super(props);
        this.state = {
            ingredient: {interactions: []}
        };
    }

    componentDidMount() {

        axios.get(global_url + '/ingredient/' + this.props.match.params.id)
            .then(res => {
                this.setState({ ingredient: res.data });
                console.log(this.state.ingredient);
            });
    }

    delete(id){
        console.log(id);
        axios.delete(global_url + '/ingredient/'+id)
            .then((result) => {
                this.props.history.push("/")
            });
    }

    render() {
        //<dd>{this.state.ingredient.interactions.map(i => <div>{i.firstIngredient}</div>)}</dd>
        console.log("Here" + this.state.ingredient.interactions);
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            Ingredient Details
                        </h3>
                    </div>
                    &emsp;
                    <div class="panel-body">
                        <h4><Link to={`/showListIngredients`}><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>Ingredients List</Link></h4>
                        <dl>
                            <dt>Name:</dt>
                            <dd>{this.state.ingredient.name}</dd>
                            <dt>Interactions:</dt>
                            <dd>{this.state.ingredient.interactions.map(i => <small><Link to={`/showInteraction/${i.id}`}>{i.secondIngredientName + ". "}</Link></small>)}</dd>
                        </dl>
                        <Link to={`/editIngredient/${this.state.ingredient.id}`} class="btn btn-success">Edit</Link>&nbsp;
                        <button onClick={this.delete.bind(this, this.state.ingredient.id)} class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowIngredient;