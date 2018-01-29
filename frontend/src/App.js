import React, { Component } from 'react';

import './App.css';
import { Legend, LineChart, XAxis, YAxis, CartesianGrid, Line, Brush } from 'recharts';

function tickFormatter() {
  return function(s) {
    let d = new Date(s)
    // eslint-disable-next-line
    let [_x, time] = s.split('T');
    let [h] = time.split(':');
    let dayStr = d.toDateString().split(' ').slice(1, 3).join(' ')
    return dayStr + ' ' + h + 'h';

  };
  //return new Date(s).toLocaleTimeString()
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    Promise.all([
      fetch('/mojvozduh-utc-1k.json').then(r => r.json()),
      fetch('/othersensor-medians.json').then(r => r.json())
    ]).then(([mojvozduh, sensor]) => {
      console.log(mojvozduh, sensor);
      mojvozduh = mojvozduh.map(mv => ({ datetime: mv.datetime, mojvozduh: mv.data }));
      sensor = sensor.map(s => ({ datetime: s.datetime, sensor: s.data }));
      let joined = mojvozduh
        .concat(sensor)
        .sort((a, b) => (a.datetime < b.datetime ? -1 : a.datetime > b.datetime ? 1 : 0));
      this.setState({ data: joined });
    });
  }
  render() {
    return (
      <div className="App">
        <h1>Compare sensors</h1>

        <LineChart width={1400} height={400} data={this.state.data} style={{ margin: '0 auto' }}>
          <XAxis dataKey="datetime" tickFormatter={tickFormatter()} />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line dot={true} connectNulls={true} type="monotone" dataKey="mojvozduh" stroke="#8884d8" />
          <Line dot={true} connectNulls={true} type="monotone" dataKey="sensor" stroke="#82ca9d" />
          <Legend />
          <Brush />
        </LineChart>
      </div>
    );
  }
}

export default App;
