import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { global_url } from '../env.js'

class ShowInteraction extends Component {


    constructor(props) {
        super(props);
        this.state = {
            interaction: {}
        };
    }

    componentDidMount() {

        axios.get(global_url + '/interaction/' + this.props.match.params.id)
            .then(res => {
                this.setState({ interaction: res.data });
                console.log(this.state.interaction);
            });
    }

    delete(id){
        console.log(id);
        axios.delete(global_url + '/interaction/'+id)
            .then((result) => {
                this.props.history.push("/")
            });
    }

    render() {
        console.log("Here" + this.state.interaction);
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            Interaction Details
                        </h3>
                    </div>
                    &emsp;
                    <div class="panel-body">
                        <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>Drugs List</Link></h4>
                        <dl>
                            <dt>First Ingredient:</dt>
                            <dd>{this.state.interaction.firstIngredientName}</dd>
                            <dt>Second Ingredient:</dt>
                            <dd>{this.state.interaction.secondIngredientName}</dd>
                            <dt>Toxicity Level:</dt>
                            <dd>{this.state.interaction.toxicityLevel}</dd>
                            <dt>Description:</dt>
                            <dd>{this.state.interaction.description}</dd>
                        </dl>
                        <Link to={`/editInteraction/${this.state.interaction.id}`} class="btn btn-success">Edit</Link>&nbsp;
                        <button onClick={this.delete.bind(this, this.state.interaction.id)} class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowInteraction;