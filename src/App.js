import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    axios.get(process.env.REACT_APP_API_ENDPOINT)
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        {data ? (
          <div>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    );
  }
}

export default App;
