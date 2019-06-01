import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { global_url } from '../env.js'

class EditInteraction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            interaction: {}
        };
    }

    componentDidMount() {

        axios.get(global_url + '/interaction/'+this.props.match.params.id)
            .then(res => {
                this.setState({ interaction: res.data });
                console.log(this.state.interaction);
            });
    }

    onChange = (e) => {
        const state = this.state.interaction
        state[e.target.name] = e.target.value;
        this.setState({interaction:state});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {firstIngredientName, secondIngredientName, toxicityLevel, description } = this.state.interaction;

        axios.put(global_url + '/interaction/'+this.props.match.params.id, {firstIngredientName, secondIngredientName, toxicityLevel, description })
            .then((result) => {
                this.props.history.push("/showInteraction/"+this.props.match.params.id)
            });
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            EDIT Interaction
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to={`/showinteraction/${this.state.interaction.id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Interactions List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="name">First Ingredient:</label>
                                <input type="text" class="form-control" name="firstIngredientName" value={this.state.interaction.firstIngredientName} onChange={this.onChange} placeholder="first ingredient" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Second Ingredient:</label>
                                <input type="text" className="form-control" name="secondIngredientName"
                                       value={this.state.interaction.secondIngredientName} onChange={this.onChange}
                                       placeholder="second ingredient"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Toxicity Level:</label>
                                <input type="text" className="form-control" name="toxicityLevel"
                                       value={this.state.interaction.toxicityLevel} onChange={this.onChange}
                                       placeholder="toxicity level (x %)"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Description:</label>
                                <input type="text" className="form-control" name="description"
                                       value={this.state.interaction.description} onChange={this.onChange}
                                       placeholder="description"/>
                            </div>
                            <button type="submit" class="btn btn-default">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditInteraction;