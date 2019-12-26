import React, { useState } from "react";

import axios from "axios";
import GraphWrap from "../components/graphWrap";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;
    this.loading = false;
    this.state = {
      graphData: []
    };
  }

  componentDidMount() {
    this.textInput.value = "SNAP";
  }

  handleClick = () => {
    this.textInput.focus();

    console.log("textInput", this.textInput.value);

    this.loading = true;
    this.forceUpdate();
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${this.textInput.value}&outputsize=full&apikey=NQ7ENATWSWUDDOZQ`
      )
      .then(res => {
        this.loading = false;
        this.setState({
          graphData: []
        });
        const data = res.data["Time Series (Daily)"];
        let graphData = [];
        Object.keys(data).forEach(d => {
          const den = new Date(d + " 17:30");

          graphData.push({ x: den.getTime(), y: data[d]["1. open"] });
        });

        console.log("graphData", graphData);
        this.setState({
          graphData
        });
      });
  };

  render() {
    return (
      <div
        style={{
          width: "1000px",
          height: "500px"
        }}
      >
        <h1>Real Value</h1>
        <p>
          Add data from api:
          <input
            type="text"
            ref={input => {
              this.textInput = input;
            }}
          />
          {this.loading ? <span>LOADING</span> : null}
          <button type="submit" onClick={this.handleClick}>
            Proces
          </button>
        </p>

        {this.state.graphData.length > 0 ? (
          <div>
            <GraphWrap graphData={this.state.graphData} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Index;
