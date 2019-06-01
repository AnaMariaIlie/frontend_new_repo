import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

class AddInteractionForm extends Component {

    constructor(props) {
        super(props);
        this.interactionName = React.createRef();
       // this.toxicityLevel = React.createRef();
      //  this.description = React.createRef();
    }

    createInteraction (e) {
        e.preventDefault();

        var interaction = this.interactionName.current.props.inputProps.value;
        var toxicityLevel = this.refs.toxicityLevel.value;
        var description = this.refs.description.value;

        if(typeof interaction === 'string' && interaction.length > 0) {
            this.props.addInteraction(interaction, toxicityLevel, description);
            this.refs.interactionForm.reset();
        }
    }
    render() {

        const value = this.props.state.value;
        const suggestions = this.props.state.suggestions;
        const inputProps = {
            placeholder: "Type a letter",
            value,
            onChange: this.props.onChangeInteractionsList
        };

        return(
            <form className="form-inline" ref="interactionForm">
                <div className="form-group">

                    <div className="insert-name">
                        <label htmlFor="tox">Name:</label>
                        <input type="text" id="tox" ref="toxicityLevel" className="form-control" name="tox"  placeholder="Toxicity Level"/>
                    </div>
                    <div className="insert-name">
                        <label htmlFor="desc">Name:</label>
                        <input type="text" id="desc" ref="description" className="form-control" name="descr" placeholder="Description"/>
                    </div>
                    <label for="interactionItem">
                        Ingredient Name
                        &emsp;
                        <Autosuggest type="text" id="interactionItem" ref={this.interactionName}
                                     suggestions={suggestions}
                                     onSuggestionsFetchRequested={this.props.onSuggestionsFetchRequested}
                                     onSuggestionsClearRequested={this.props.onSuggestionsClearRequested}
                                     getSuggestionValue={this.props.getSuggestionValue}
                                     renderSuggestion={this.props.renderSuggestion}
                                     onSuggestionSelected={this.props.onSuggestionSelected}
                                     inputProps={inputProps}
                        />
                        &emsp;
                        <button type="submit" className="btn btn-primary"  onClick={this.createInteraction.bind(this)} >Add Interaction</button>

                    </label>
                </div>

            </form>
        )
    }
}

export default AddInteractionForm;