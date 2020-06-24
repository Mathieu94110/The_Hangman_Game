import React, { Component } from "react";
import "../App.css";
import { randomWords } from "../words";
import step1 from "../images/0.jpg";
import step2 from "../images/1.jpg";
import step3 from "../images/2.jpg";
import step4 from "../images/3.jpg";
import step5 from "../images/4.jpg";
import step6 from "../images/5.jpg";
import step7 from "../images/6.jpg";
import { Button } from "reactstrap";
import "./HangedMan.css";
class HangedMan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mistakes: 0,
      randomWords: randomWords(),
      set: new Set([]),
    };
  }

  static defaultProps = {
    images: [step1, step2, step3, step4, step5, step6, step7],
    maxErrors: 6,
  };

  generatedButtons = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
      <Button
        className="col-1 "
        color="primary"
        key={letter}
        value={letter}
        disabled={this.state.set.has(letter) ? true : false}
        onClick={this.handleSetChange}
      >
        {letter}
      </Button>
    ));
  };

  hiddenWords = () => {
    return this.state.randomWords
      .split("")
      .map((letter) => (this.state.set.has(letter) ? letter : " _"));
  };

  handleSetChange = (e) => {
    let letter = e.target.value;
    this.setState((ancienState) => ({
      set: ancienState.set.add(letter),
      mistakes:
        ancienState.mistakes +
        (ancienState.randomWords.includes(letter) ? 0 : 1),
    }));
  };

  reset = () => {
    this.setState({
      mistakes: 0,
      randomWords: randomWords(),
      set: new Set([]),
    });
  };

  isWinner = () => {
    return <div className="winIssue">Vous avez gagné !</div>;
  };
  isgameOver() {
    return <div className="looseIssue">Vous avez perdu !</div>;
  }

  render() {
    const gameOver = this.state.mistakes >= this.props.maxErrors;
    const Winner = this.hiddenWords().join("") === this.state.randomWords;

    return (
      <div className="App">
        <h1>Le jeu du pendu </h1>
        <div className="Stats">
          Nombre d'erreurs : {this.state.mistakes}/ {this.props.maxErrors}
        </div>
        <div>{gameOver ? this.state.randomWords : this.hiddenWords()}</div>
        <div>
          {Winner ? this.isWinner() : null}
          {gameOver ? this.isgameOver() : null}
        </div>
        <div>
          <img src={this.props.images[this.state.mistakes]} alt="" />
        </div>

        <div className="Restart">
          <Button color="info" onClick={this.reset}>
            Recommencer
          </Button>
        </div>

        <div>
          <div className="Buttons">{this.generatedButtons()}</div>
        </div>
      </div>
    );
  }
}

export default HangedMan;
