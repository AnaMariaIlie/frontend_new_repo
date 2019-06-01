import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { global_url } from '../env.js';
import InteractionsList from './utils/InteractionsList';
import AddInteractionForm from "./utils/AddInteractionForm";

class Create extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            toxicityLevel:'',
            description:'',
            stringInteractions: [],
            allInteractions: [],
            value: '',
            suggestions: [],
            interactions: [],
        };

        this.onChangeInteractionsList = this.onChangeInteractionsList.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.escapeRegexCharacters = this.escapeRegexCharacters.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
    }


    componentDidMount() {
        axios.get(global_url + '/ingredients')
            .then(res => {
                this.setState({ ingredients: res.data,
                    allInteractions: res.data});
            });
    }

    escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    getSuggestions = value => {
        const escapedValue = this.escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');
        const suggestions = this.state.allInteractions.filter(i => regex.test(i.name));

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


    onChangeInteractionsList = (event, { newValue, method }) => {
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

        const { name, interactions,toxicityLevel, description} = this.state;

        console.log(interactions);
        axios.post(global_url + '/ingredient', { name, interactions, toxicityLevel, description});
    }

    addInteraction(ingredient, toxicityLevel, description) {

        this.state.stringInteractions.push(ingredient);
       // const result = this.state.allInteractions.find(e => e.name === ingredient);

        //secondIngredientName
        //firstIngredientName

        this.state.interactions.push({
            toxicityLevel: toxicityLevel,
            description: description,
            firstIngredientName: this.state.name,
            secondIngredientName: ingredient
        });

        this.setState({
            toxicityLevel: toxicityLevel,
            description: description,
            interactions : this.state.interactions
        });

    }

    render() {
        const { name } = this.state;

        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            ADD Ingredient
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to="/showListIngredients"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Ingredients List</Link></h4>
                        <form>
                            <div className="insert-name">
                                <label for="isbn">Name:</label>
                                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
                            </div>

                            <div className="form-group">
                                <label for="publisher">Interactions:</label>
                                <InteractionsList interactions={this.state.stringInteractions} />
                                <AddInteractionForm addInteraction={this.addInteraction.bind(this)}
                                             state={this.state}
                                             onChangeInteractionsList={this.onChangeInteractionsList.bind(this)}
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