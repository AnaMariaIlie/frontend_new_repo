import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { global_url } from '../env.js';
import Pagination from "./Pagination";
import Autosuggest from 'react-autosuggest';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            displayedItems:[],
            pageOfItems: [],
            value: '',
            suggestions: []
        };

        this.handlePageChange = this.handlePageChange.bind(this);
        this.onChange = this.onChange.bind(this);
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
        const suggestions = this.state.ingredients.filter(i => regex.test(i.name));

        if (suggestions.length === 0) {
            return [
                { isAddNew: true }
            ];
        }

        return suggestions;
    }


    handlePageChange(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }

    componentDidMount() {
        axios.get(global_url + '/ingredients')
            .then(res => {
                this.setState({ ingredients: res.data });
                this.setState({ displayedItems: res.data });
            });
    }

    onChange = (event, { newValue, method }) => {
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

    search = () => {
        const val_ing  = this.state.ingredients.filter(i => i.name === this.state.value);
        console.log(val_ing);
        this.props.history.push("/showIngredient/" + val_ing[0].id);
    }

    render() {
        const value = this.state.value;
        const suggestions = this.state.suggestions;
        const inputProps = {
            placeholder: "Type 'c'",
            value,
            onChange: this.onChange
        };
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            INGREDIENTS LIST
                        </h3>
                    </div>
                    &emsp;
                    <div class="panel-body">
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            onSuggestionSelected={this.onSuggestionSelected}
                            inputProps={inputProps}
                        />
                        <button onClick={this.search.bind(this)}>Search</button>
                        <h4><Link to="/createIngredient"  className="h-color" ><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>Add Ingredient</Link></h4>

                        {this.state.pageOfItems.map(item =>
                            <div key={item.id}><Link to={`/showIngredient/${item.id}`}>{item.name}</Link></div>
                        )}
                        &emsp;
                        <Pagination items={this.state.ingredients} onChangePage={this.handlePageChange} />


                    </div>
                </div>
            </div>
        );
    }
}

export default App;