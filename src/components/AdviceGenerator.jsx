import React from "react";

import axios from "axios";

import "./AdviceGenerator.css";

class AdviceGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      advice: "",
      isLoading: true,
    };

    this.getAdvice = this.getAdvice.bind(this);
  }

  componentDidMount() {
    this.getAdvice();
  }

  getAdvice() {
    // fetch
    // fetch("https://api.adviceslip.com/advice")
    //   .then((res) => res.json())
    //   .then((res) => {
    //     this.setState({ advice: res.slip.advice, isLoading: false });
    //   });

    // axios
    axios
      .get(`https://api.adviceslip.com/advice`)
      .then(({ data: { slip: { advice } } }) =>
        this.setState({ advice: advice, isLoading: false })
      );
  }

  render() {
    const { advice, isLoading } = this.state;

    return (
      <div className="advice-generator">
        <button
          className="generate-advice"
          onClick={() => {
            this.setState({ isLoading: true });
            this.getAdvice();
          }}
        >
          Generate Advice
        </button>
        {!isLoading ? (
          <p className="advice">{advice}</p>
        ) : (
          <div className="loading">Loading....</div>
        )}
      </div>
    );
  }
}

export default AdviceGenerator;
