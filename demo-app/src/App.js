import React, {Component} from 'react';
import SearchForm from './component/SearchForm'
import ParkingList from './component/ParkingList'

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchLocationStr: null
        }
    }
    submitSearch = (searchLocationStr) =>{
        this.setState({
            searchLocationStr: searchLocationStr
        })
    }
    render(){
        return(
            <div>
                {/* Search Form Box */}
                <SearchForm submitSearch = {this.submitSearch}/>
                {/* Parking List */}
                <ParkingList searchLocationQuery = {this.state.searchLocationStr}/>
            </div>
        );
    }
}

export default App;