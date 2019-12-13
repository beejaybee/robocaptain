import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';

class App extends Component  {
    constructor(props){
        super(props);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.state= {
            robots: [],
            searchfield: ''
        }
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots: users}));
    
    }

    onSearchChange (event) {
        this.setState({searchfield: event.target.value});
    }

    render(){
        const  {robots, searchfield} = this.state;

        const filterdRobots = robots.filter(robot =>{
            return robot.name.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase())
        })

        if (!robots.length){
            return <h1>Loading</h1>
        } else{
    return (
        <div className='tc'>

            <h1 className='tc f1'>RoboFriends</h1>

            <SearchBox  searchChange={this.onSearchChange} />

            <Scroll>
                <CardList robots={ filterdRobots } />
            </Scroll>
        </div>
    )
        }
 }
}



export default App;