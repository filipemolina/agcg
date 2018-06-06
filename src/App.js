import React, { Component } from 'react';
import './App.css';

import Hand from './components/Hand'
import Side from './components/Side'

class App extends Component {

  state = {
    player1: {
      pilhas: [
        { nome: "devoto",     qtd: 4 },
        { nome: "mago",       qtd: 4 },
        { nome: "lanceiro",   qtd: 4 },
        { nome: "cavaleiro",  qtd: 4 },
        { nome: "divinacao",  qtd: 4 },
        { nome: "reforcar",   qtd: 4 },
        { nome: "esconjurar", qtd: 4 },
        { nome: "distracao",  qtd: 4 },
      ],
      deck: [
        { nome: "templo" },
        { nome: "templo" },
        { nome: "templo" },
        { nome: "templo" },
        { nome: "templo" },
        { nome: "templo" },
        { nome: "templo" },
        { nome: "templo" },
        { nome: "templo" },
        { nome: "templo" },
      ],
      descarte: [],
      cemiterio: [],
      mao: [],
      terreno: [],
      battlefield: [],
      ouro: 0,
    },
    player2: {
      pilhas: [
        { nome: "guerreiro",        qtd: 4 },
        { nome: "protetor",         qtd: 4 },
        { nome: "cruzado",          qtd: 4 },
        { nome: "heroi",            qtd: 4 },
        { nome: "gigante",          qtd: 4 },
        { nome: "raio",             qtd: 4 },
        { nome: "ataque_berserker", qtd: 4 },
        { nome: "furia_de_batalha", qtd: 4 },
      ],
      deck: [
        { nome: "templo" },
        { nome: "templo" },
        { nome: "templo" },
        { nome: "templo" },
        { nome: "templo" },
        { nome: "templo" },
        { nome: "templo" },
        { nome: "templo" },
        { nome: "templo" },
        { nome: "templo" },
      ],
      descarte: [],
      cemiterio: [],
      mao: [],
      terreno: [],
      battlefield: [],
      ouro: 0,
    },
    jogadorAtual: "player1",
    oponente: "player2",
  }

  componentDidMount = () => {

    this.sacar("player1", 5);

  }

  sacar = (jogador, qtd) => {

    for(let i = 0; i < qtd; i++){

      this.setState(state => ({
        [jogador]: {
          ...state[jogador],
          mao: [
            ...state[jogador].mao,
            state[jogador].deck.pop()
          ]
        }
      }))

    }

  }

  render() {

    const player1 = this.state[this.state.jogadorAtual];
    const player2 = this.state[this.state.oponente];

    console.log("MAO", this.state.player1.mao)
    console.log("")

    return (
      <div id="game-area">

        <Hand position="upper" cards={player2.mao}/>

        <div id="room">
          <div id="table">

            <Side side="sideA" pilhas={player1.pilhas} />

            <Side side="sideB" pilhas={player2.pilhas} />

          </div>
        </div>

        <Hand position="lower" cards={player1.mao} />
      </div>
    );
  }
}

export default App;
