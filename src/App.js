import React, { Component } from 'react';
import './App.css';

import Hand from './components/Hand'
import Side from './components/Side'
import Mercado from './components/Mercado'
import HUD from './components/HUD'

class App extends Component {

  state = {
    player1: {
      mercado: [
        { nome: "devoto",     qtd: 4, tipo: 'criatura' },
        { nome: "mago",       qtd: 4, tipo: 'criatura' },
        { nome: "lanceiro",   qtd: 4, tipo: 'criatura' },
        { nome: "cavaleiro",  qtd: 4, tipo: 'criatura' },
        { nome: "divinacao",  qtd: 4, tipo: 'evento' },
        { nome: "reforcar",   qtd: 4, tipo: 'evento' },
        { nome: "esconjurar", qtd: 4, tipo: 'evento' },
        { nome: "distracao",  qtd: 4, tipo: 'evento' },
      ],
      deck: [
        { nome: "templo", tipo: 'terreno' },
        { nome: "templo", tipo: 'terreno' },
        { nome: "templo", tipo: 'terreno' },
        { nome: "templo", tipo: 'terreno' },
        { nome: "templo", tipo: 'terreno' },
        { nome: "templo", tipo: 'terreno' },
        { nome: "templo", tipo: 'terreno' },
        { nome: "templo", tipo: 'terreno' },
        { nome: "templo", tipo: 'terreno' },
        { nome: "templo", tipo: 'terreno' },
      ],
      descarte: [],
      cemiterio: [],
      mao: [],
      terreno: [],
      battlefield: [],
      ouro: 0,
      vida: 20,
      nome: "player1",
    },
    player2: {
      mercado: [
        { nome: "guerreiro",        qtd: 4, tipo: 'criatura' },
        { nome: "protetor",         qtd: 4, tipo: 'criatura' },
        { nome: "cruzado",          qtd: 4, tipo: 'criatura' },
        { nome: "heroi",            qtd: 4, tipo: 'criatura' },
        { nome: "gigante",          qtd: 4, tipo: 'criatura' },
        { nome: "raio",             qtd: 4, tipo: 'evento' },
        { nome: "ataque_berserker", qtd: 4, tipo: 'evento' },
        { nome: "furia_de_batalha", qtd: 4, tipo: 'evento' },
      ],
      deck: [
        { nome: "templo", tipo: 'terreno' },
        { nome: "templo", tipo: 'terreno' },
        { nome: "templo", tipo: 'terreno' },
        { nome: "templo", tipo: 'terreno' },
        { nome: "templo", tipo: 'terreno' },
        { nome: "templo", tipo: 'terreno' },
        { nome: "templo", tipo: 'terreno' },
        { nome: "templo", tipo: 'terreno' },
        { nome: "templo", tipo: 'terreno' },
        { nome: "templo", tipo: 'terreno' },
      ],
      descarte: [],
      cemiterio: [],
      mao: [],
      terreno: [],
      battlefield: [],
      ouro: 0,
      vida: 20,
      nome: "player2",
    },
    jogadorAtual: "player1",
    oponente: "player2",
    templo2: 10,
    templo3: 10,
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

  enviarDaMao = (jogador, nome, tipo) => {

    console.log("CHAMOU DE DENTRO DO APP")

    let mao = this.state[jogador].mao
    let indice = mao.findIndex(item => item.nome === nome)
    let destino

    if(tipo === 'criatura')
      destino = 'battlefield'
    else if(tipo === 'evento')
      destino = 'descarte'
    else
      destino = 'terreno'

    this.setState(state => ({
      [jogador] : {
        ...state[jogador],
        mao: state[jogador].mao.filter((item, i) => i !== indice ),
        [destino] : [
          ...state[jogador][destino],
          { nome, tipo }
        ]
      }
    }))
  }

  render() {

    const player1 = this.state[this.state.jogadorAtual];
    const player2 = this.state[this.state.oponente];

    const mercado = player1.mercado

    return (
      <div id="game-area">

        <HUD moedas={player1.ouro} vida={player1.vida}/>

        <Mercado position="left" itens={mercado} />
        <Mercado position="right" itens={mercado} />

        <Hand position="lower" cards={player1.mao} enviarDaMao={this.enviarDaMao} jogador={this.state.jogadorAtual}/>

        <div id="room">
          <div id="table">

            <Side side="sideA" terreno={player1.terreno} battlefield={player1.battlefield} />

            <Side side="sideB" terreno={player2.terreno} battlefield={player2.battlefield}  />

          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
