import React, { Component } from 'react';
import './App.css';
import { randomWords } from './words';
import step1 from './images/0.jpg';
import step2 from "./images/1.jpg";
import step3 from "./images/2.jpg";
import step4 from "./images/3.jpg";
import step5 from "./images/4.jpg";
import step6 from "./images/5.jpg";
import step7 from "./images/6.jpg";


class HangedMan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mistakes: 0,
            randomWords: randomWords(),
            set: new Set([]),
        }
    }

    static defaultProps = {
        images: [step1, step2, step3, step4, step5, step6, step7],
        maxErrors: 6
    }

    generatedButtons = () => {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
            <button key={letter}
                value={letter}
                disabled={this.state.set.has(letter) ? true : false}
                onClick={this.handleSetChange}
            >{letter}</button>
        ))
    }

    hiddenWords = () => {
        return this.state.randomWords.split("").map(letter => this.state.set.has(letter) ? letter : " _")
    }

    handleSetChange = (e) => {
        let letter = e.target.value;
        this.setState((ancienState) => ({
            set: ancienState.set.add(letter),
            mistakes:
                ancienState.mistakes +
                (ancienState.randomWords.includes(letter) ? 0 : 1),
        }));
    }




    render() {
        const gameOver = this.state.mistakes === this.props.maxErrors;
        return (
            <div className="App">
                <h1>Le jeu du pendu </h1>
                <div style={{ fontWeight: "bold" }}>Nombre d'erreurs : {this.state.mistakes}/ {this.props.maxErrors}</div>
                <div>{this.hiddenWords()}</div>

                <div><img src={this.props.images[this.state.mistakes]} alt="" /></div>
                <div>
                    {this.generatedButtons()}
                </div>
            </div>
        )
    }





}

export default HangedMan;