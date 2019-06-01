import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { global_url } from '../env.js'

class EditIngredient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredient: {interactions: []}
        };
    }


    componentDidMount() {

        axios.get(global_url + '/ingredient/'+this.props.match.params.id)
            .then(res => {
                this.setState({ ingredient: res.data });
                console.log(this.state.ingredient);
            });
    }

    onChange = (e) => {
        const state = this.state.ingredient
        state[e.target.name] = e.target.value;
        this.setState({ingredient:state});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {name, interactions } = this.state.ingredient;

        axios.put(global_url + '/ingredient/'+this.props.match.params.id, { name, interactions })
            .then((result) => {
                this.props.history.push("/showIngredient/"+this.props.match.params.id)
            });
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            EDIT Ingredient
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to={`/showIngredient/${this.state.ingredient.id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Ingredients List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="name">Name:</label>
                                <input type="text" class="form-control" name="name" value={this.state.ingredient.name} onChange={this.onChange} placeholder="Name" />
                            </div>
                            <div class="form-group">
                                <label for="title">Interactions:</label>
                                <dd>{this.state.ingredient.interactions.map(i => <small><Link to={`/showInteraction/${i.id}`}>{i.secondIngredientName + ". "}</Link></small>)}</dd>                            </div>
                            <button type="submit">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditIngredient;