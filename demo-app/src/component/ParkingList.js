import React, {Component} from 'react';
import axios from 'axios';



class ParkingList extends Component{
    constructor(props){
        super(props);
        this.state = {
            results: [],
            errorCheck: null,
            loadingPage: false,
            api_key: 'mi5qSSqdhmrNXBjLq5MBMwuqcS0q8aE4u52fwqrG8CkrBjjksgdV8ZblHdh4ThtDqQVFapfOwrCqadcTH4sJIMhQgEcWpc0bK_9ms_rJ1H-xMT1Amp4tmH_PhAg3X3Yx'
        }
    }

    componentDidUpdate(prevProp, prevState){
        if(this.props.searchLocationQuery !== prevProp.searchLocationQuery){
            this.setState({
                results: [],
            }, () => this.getParkingFromAPI(this.props.searchLocationQuery))
        }
    }
    calculateScore(review_count, rating){
        return ( review_count * rating ) / (review_count + 1);
    }

    getParkingFromAPI = (searchLocationQuery) =>{
        this.setState({loadingPage:true})
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${searchLocationQuery}`, {
        headers: {
            Authorization: `Bearer ${this.state.api_key}`
        },
        params: {
        categories: 'parking',
        }
        })
        .then((res) => {
            let data = res.data.businesses;
            data.forEach(element => element.score = this.calculateScore(element.review_count, element.rating));
            // sort data from lowest to highest
            data.sort((a,b) =>{
                return a.score - b.score;
            });
            this.setState({results: data, loadingPage:false});
        })
        .catch((err) => {
            this.setState({errorCheck: 'Sorry we could not find the parking lots. Please try again'});
        })
    }

    renderParkingList(){
        const ParkingList = this.state.results.map((result, index) => {
            return(
                <div key = {result.id}>
                    <h3 tabindex="0">{index+1}){result.name}</h3>
                    <img src={result.image_url} alt="No Image Found"/>
                    <p>Score: {result.score}</p><br/>
                    <p>Address: {result.location.display_address[0]}, {result.location.display_address[1]}</p><br/>
                    <p>Rating: {result.rating}</p><br/>
                    <p>Review Count: {result.review_count}</p><br/>
                    <p>Link:<a href={result.url}>{result.url}</a> </p>
                </div>
            )
        });
        return(
            <div>
                {ParkingList}
            </div>
        )
    }
    
    renderEmpty(){
        return(
            <div>
                We are working on getting you the list
            </div>
        )
    }
    render(){
        return(
            <div>
                <section>
                    {this.state.results.length ? this.renderParkingList() : this.renderEmpty()}
                    {!!this.state.errorCheck && <h1>Error Loading</h1>}
                </section>
            </div>
        )
    }
}

export default ParkingList;