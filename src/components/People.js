import React, { Component } from 'react';
import { Link }from 'react-router-dom';


class List extends Component {
  render(){
    console.log('props', this.props.people)
    let data = this.props.people;
    let List = data.map((people)=>{
      let url = people.url;
      let endpoint = url.substr(url.indexOf("/api/") + 5);
      let films = people.films.map((films)=>{
        let endpoint = films.substr(films.indexOf("/api/") + 5);
        return <li className="list-group-item" key={films}><Link to={`/details/${endpoint}`}>{endpoint}</Link></li>
      })
      let starships = people.starships.map((starships)=>{
        let endpoint = starships.substr(starships.indexOf("/api/") + 5 );
        return <li className="list-group-item" key={starships}><Link to={`/details/${endpoint}`}>{endpoint}</Link></li>
      })
      return (
        <div key={people.name} className="col-lg-10 col-lg-offset-1 card">
          <div className="col-lg-4">
            <div className="profile">
              <i className="fa fa-user" aria-hidden="true"></i>
              <h3 className = "headings">
                  {people.name}
              </h3>
              <h4 className = "sub-headings">API Endpoint: {endpoint}</h4>
              <hr/>
              <h4 className = "sub-headings">Profile</h4>
              <dl className="dl-horizontal">
                <dt>Birth Year</dt>
                <dd>{people.birth_year}</dd>
                <dt>Gender</dt>
                <dd>{people.gender}</dd>
                <dt>Mass</dt>
                <dd>{people.mass}</dd>
                <dt>Height</dt>
                <dd>{people.height}</dd>
                <dt>Eye Color</dt>
                <dd>{people.eye_color}</dd>
                <dt>Hair Color</dt>
                <dd>{people.hair_color}</dd>
              </dl>
            </div>
          </div>
          <div className="col-lg-3">
            <h4 className = "sub-headings">Film Endpoints</h4>
            <hr/>
            <ul className="list-group">
              {films}
            </ul>
          </div>
          <div className="col-lg-3">
            <h4 className = "sub-headings">Starship Endpoints</h4>
            <hr/>
            <ul className="list-group">
              {starships}
            </ul>
          </div>
        </div>
      )
    })
    return(
      <div className="row">
        <div className="col-lg-10 col-lg-offset-1">
          <h1 className="headings">People</h1>
          <hr/>
        </div>
        {List}
      </div>
    )
  }
}

class People extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'people': [],
    }
  }

  componentDidMount(){
    let url ="https://swapi.dev/api/people/";
    // Fetch data from API
    fetch(url).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data)
      this.setState({people: data.results})
    });
  }


  render() {
    return (
      <div className="app-body offset col-lg-10 col-lg-offset-1">
        <List people={this.state.people}/>
      </div>
    );
  }
}

export default People;
