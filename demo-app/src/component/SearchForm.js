import React, {Component} from 'react';

class SearchForm extends Component{
    constructor(){
        super();
        this.state = {
            searchLocationStr : null
        }
    }
    handleChangeInput = (e) =>{
        this.setState({
            searchLocationStr: e.target.value
        })
    }
    handleFormSubmit = (e) =>{
        e.preventDefault();
        this.props.submitSearch(this.state.searchLocationStr)
    }
    render(){
        return(
            <div>
                <form onSubmit={(e) => this.handleFormSubmit(e)}>
                    <h1>SEARCH FORM</h1>
                    <label htmlFor="searchQuery"
                            aria-label="Search Form Input"
                    >I am looking for parking lots</label>
                    <input 
                    type="text" 
                    name="searchQuery" 
                    id="searchQuery"
                    placeholder="Enter the location"
                    aria-label='Enter address, neighborhood, city, province or postal code'
                    value={this.state.searchLocationStr}
                    onChange= {this.handleChangeInput}
                    />
                    <button type='submit' aria-label="Search">Search</button>
                </form>
            </div>
        )
    }
}


export default SearchForm