import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class List extends Component {
  render(){
    console.log('props', this.props.starships)
    let data = this.props.starships;
    let List = data.map((starships)=>{
      let films = starships.films.map((films)=>{
        let endpoint = films.substr(films.indexOf("/api/") + 5);
        return <li className="list-group-item" key={films}><Link to={`/details/${endpoint}`}>{endpoint}</Link></li>
      })
      return (
        <div key={starships.name} className="col-lg-10 col-lg-offset-1 card">
          <div className="col-lg-6">
            <div className="profile">
              <i className="fa fa-space-shuttle" aria-hidden="true"></i>
              <h3 className = "headings">
                 {starships.name}
              </h3>
              <hr/>
              <h4 className = "sub-headings">Profile</h4>
              <dl className="dl-horizontal">
                <dt>MGLT</dt>
                <dd>{starships.MGLT}</dd>
                <dt>Manufacturer</dt>
                <dd>{starships.manufacturer}</dd>
                <dt>Model</dt>
                <dd>{starships.model}</dd>
                <dt>Class</dt>
                <dd>{starships.starship_class}</dd>
                <dt>Cargo</dt>
                <dd>{starships.cargo_capacity}</dd>
                <dt>Length</dt>
                <dd>{starships.length}</dd>
              </dl>
            </div>
          </div>
          <div className="col-lg-6">
            <h4 className = "sub-headings">Film Endpoints</h4>
            <hr/>
            <ul className="list-group">
              {films}
            </ul>
          </div>
        </div>
      )
    })
    return(
      <div className="row">
        <div className="col-lg-10 col-lg-offset-1">
          <h1 className="headings">Starships</h1>
          <hr/>
        </div>
        {List}
      </div>
    )
  }
}

class Starships extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'starships': [],
    }
  }

  componentDidMount(){
    let url ="https://swapi.dev/api/starships/";
    // Fetch data from API
    fetch(url).then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({starships: data.results})
    });
  }


  render() {
    console.log('render', this.state)
    
    return (
      <div className="app-body offset col-lg-10 col-lg-offset-1">
        <List starships={this.state.starships}/>
      </div>
    );
  }
}

export default Starships;
