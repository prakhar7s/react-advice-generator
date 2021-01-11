import React from "react";

import axios from "axios";

import "./AdviceGenerator.css";

class AdviceGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      advice: "",
      isLoading: true,
      count: 0,
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
    axios.get(`https://api.adviceslip.com/advice`).then(
      ({
        data: {
          slip: { advice },
        },
      }) => {
        this.setState({ advice: advice, isLoading: false, count: 5 });
        this.manageCounter();
      }
    );
  }

  manageCounter() {
    const counter = setInterval(() => {
      this.setState({
        count: this.state.count <= 0 ? 5 : this.state.count - 1,
      });

      if (this.state.count <= 0) {
        clearInterval(counter);
      }
    }, 1000);
  }

  render() {
    const { advice, isLoading, count } = this.state;

    return (
      <div className="advice-generator">
        <button
          className="generate-advice"
          onClick={() => {
            if (count === 0) {
              this.setState({ isLoading: true });
              this.getAdvice();
            }
          }}
        >
          Generate Advice
        </button>
        {!isLoading ? (
          <p className="advice">{advice}</p>
        ) : (
          <div className="loading"></div>
        )}

        {count !== 0 ? (
          <h1 className="timer">
            You can regenerate advice in {count} seconds!
          </h1>
        ) : null}
      </div>
    );
  }
}

export default AdviceGenerator;
