import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

class AddItemForm extends Component {

    constructor(props) {
        super(props);
        this.ingredientName = React.createRef();
    }

    createIngredient (e) {
        e.preventDefault();

        var ingredient = this.ingredientName.current.props.inputProps.value;
        console.log(ingredient);

        if(typeof ingredient === 'string' && ingredient.length > 0) {
            this.props.addIngredient(ingredient);
            this.refs.ingredientForm.reset();
        }
    }
    render() {

        const value = this.props.state.value;
        const suggestions = this.props.state.suggestions;
        const inputProps = {
            placeholder: "Type a letter",
            value,
            onChange: this.props.onChangeIngredientsList
        };

        return(
            <form className="form-inline" ref="ingredientForm">
                <div className="form-group">
                    <label for="ingredientItem">
                        Ingredient Name
                        &emsp;
                        <Autosuggest type="text" id="ingredientItem" ref={this.ingredientName}
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.props.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.props.onSuggestionsClearRequested}
                            getSuggestionValue={this.props.getSuggestionValue}
                            renderSuggestion={this.props.renderSuggestion}
                            onSuggestionSelected={this.props.onSuggestionSelected}
                            inputProps={inputProps}
                        />
                        &emsp;
                        <button type="submit" className="btn btn-primary"  onClick={this.createIngredient.bind(this)} >Add Ingredient</button>

                    </label>
                </div>

            </form>
        )
    }
}

export default AddItemForm;