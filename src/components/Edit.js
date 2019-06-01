import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { global_url } from '../env.js'

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drug: {}
        };
    }

    componentDidMount() {
        
        axios.get(global_url + '/drug/'+this.props.match.params.id)
            .then(res => {
                this.setState({ drug: res.data });
                console.log(this.state.drug);
            });
    }

    onChange = (e) => {
        const state = this.state.drug
        state[e.target.name] = e.target.value;
        this.setState({drug:state});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {name, ingredients } = this.state.drug;

        axios.put(global_url + '/drug/'+this.props.match.params.id, { name, ingredients })
            .then((result) => {
                this.props.history.push("/show/"+this.props.match.params.id)
            });
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            EDIT Drug
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to={`/show/${this.state.drug.id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>Drugs List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="name">Name:</label>
                                <input type="text" class="form-control" name="name" value={this.state.drug.name} onChange={this.onChange} placeholder="Name" />
                            </div>
                            <div class="form-group">
                                <label for="title">Ingredients:</label>
                                <input type="text" class="form-control" name="ingredients" value={this.state.drug.ingredients} onChange={this.onChange} placeholder="Ingredients" />
                            </div>
                            <button type="submit" class="btn btn-default">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;