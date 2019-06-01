import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { global_url } from '../env.js';
import ItemsList from './utils/ItemsList';
import AddItemForm from './utils/AddItemForm';

class Create extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            stringIngredients: [],
            allIngredients: [],
            ingredients: [],
            value: '',
            suggestions: []
        };

        this.onChangeIngredientsList = this.onChangeIngredientsList.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.escapeRegexCharacters = this.escapeRegexCharacters.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
    }

    escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    getSuggestions = value => {
        const escapedValue = this.escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');
        const suggestions = this.state.allIngredients.filter(i => regex.test(i.name));

        if (suggestions.length === 0) {
            return [
                { isAddNew: true }
            ];
        }

        return suggestions;
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }


    componentDidMount() {
        axios.get(global_url + '/ingredients')
            .then(res => {
                this.setState({ allIngredients: res.data });
            });
    }

    onChangeIngredientsList = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };


    getSuggestionValue = suggestion => {
        if (suggestion.isAddNew) {
            return this.state.value;
        }

        return suggestion.name;
    };

    renderSuggestion = suggestion => {
        if (suggestion.isAddNew) {
            return (
                <span>
          [+] Add new: <strong>{this.state.value}</strong>
        </span>
            );
        }

        return suggestion.name;
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestion }) => {
        if (suggestion.isAddNew) {
            console.log('Add new:', this.state.value);
        }
    };


    onSubmit = (e) => {
        e.preventDefault();

        const { name, ingredients} = this.state;

        console.log(ingredients);
        axios.post(global_url + '/drug', { name, ingredients});
            //.then((result) => {
               // this.props.history.push("/")
           // });
    }

    addIngredient(ingredient) {

        const result = this.state.allIngredients.find(e => e.name === ingredient);

        this.state.stringIngredients.push(ingredient);
        this.state.ingredients.push(result);
        console.log(result);
        this.setState({ ingredients : this.state.ingredients });
    }

    render() {
        const { name } = this.state;

        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            ADD Drug
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Drugs List</Link></h4>
                        <form>
                            <div className="insert-name">
                                <label for="isbn">Name:</label>
                                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
                            </div>
                            <div className="form-group">
                                <label for="publisher">Ingredients:</label>
                                <ItemsList ingredients={this.state.stringIngredients} />
                                <AddItemForm addIngredient={this.addIngredient.bind(this)}
                                             state={this.state}
                                             onChangeIngredientsList={this.onChangeIngredientsList.bind(this)}
                                             renderSuggestion ={this.renderSuggestion.bind(this)}
                                             onSuggestionsFetchRequested = {this.onSuggestionsFetchRequested.bind(this)}
                                             onSuggestionsClearRequested = {this.onSuggestionsClearRequested.bind(this)}
                                             getSuggestionValue={this.getSuggestionValue.bind(this)}
                                             onSuggestionSelected={this.onSuggestionSelected.bind(this)}
                                />
                            </div>
                            <button type="submit" class="btn btn-primary"  onClick={this.onSubmit.bind(this)}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Create;