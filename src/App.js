import React, { Component } from 'react';
import './App.css';
import shuffle from 'shuffle-array'

import Hand from './components/Hand'
import Side from './components/Side'
import Mercado from './components/Mercado'
import HUD from './components/HUD'

import * as helpers from './helpers'
import uuidv1 from 'uuid/v1'

class App extends Component {

  //////////////////////////////////////////////////////////////////
  // Quando uma carta no mercado chegar a 0 desabilitar os botões
  // Quando uma carta atacar, virar automaticamente
  // Quando uma carta for descartada, desvirar
  // Implementar o Zoom quando der hover em uma carta do mercado

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
        { nome: "templo",     tipo: 'terreno', id: uuidv1() },
        { nome: "templo",     tipo: 'terreno', id: uuidv1() },
        { nome: "templo",     tipo: 'terreno', id: uuidv1() },
        { nome: "templo",     tipo: 'terreno', id: uuidv1() },
        { nome: "templo",     tipo: 'terreno', id: uuidv1() },
        { nome: "templo",     tipo: 'terreno', id: uuidv1() },
        { nome: "templo",     tipo: 'terreno', id: uuidv1() },
        { nome: "reforcar",   tipo: 'evento',  id: uuidv1() },
        { nome: "esconjurar", tipo: 'evento',  id: uuidv1() },
        { nome: "distracao",  tipo: 'evento',  id: uuidv1() },
      ],
      descarte: [],
      cemiterio: [],
      mao: [],
      terreno: [],
      battlefield: [],
      ataque: [],
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
        { nome: "templo", tipo: 'terreno', id: uuidv1() },
        { nome: "templo", tipo: 'terreno', id: uuidv1() },
        { nome: "templo", tipo: 'terreno', id: uuidv1() },
        { nome: "templo", tipo: 'terreno', id: uuidv1() },
        { nome: "templo", tipo: 'terreno', id: uuidv1() },
        { nome: "templo", tipo: 'terreno', id: uuidv1() },
        { nome: "templo", tipo: 'terreno', id: uuidv1() },
        { nome: "templo", tipo: 'terreno', id: uuidv1() },
        { nome: "templo", tipo: 'terreno', id: uuidv1() },
        { nome: "templo", tipo: 'terreno', id: uuidv1() },
      ],
      descarte: [],
      cemiterio: [],
      mao: [],
      terreno: [],
      battlefield: [],
      ataque: [],
      ouro: 0,
      vida: 20,
      nome: "player2",
    },
    templos: [
      { nome: "templo2", tipo: "terreno", qtd: 10 },
      { nome: "templo3", tipo: "terreno", qtd: 10 },
    ],
    jogadorAtual: "player1",
    oponente: "player2",
    templo2: 10,
    templo3: 10,
  }

  componentDidMount = () => {

    const { jogadorAtual } = this.state

    // Embaralhar o deck inicial do jogador
    this.embaralhar(jogadorAtual, 'deck')

    this.sacar("player1", 5);

  }

  embaralhar = (jogador, deck) => {

    this.setState(state => ({
      [jogador]: {
        ...state[jogador],
        [deck]: shuffle(state[jogador][deck])
      }
    }))

  }

  sacar = (jogador, qtd) => {

    for(let i = 0; i < qtd; i++){

      // Caso ainda haja cartas na compra
      if(this.state[jogador].deck.length){

        this.setState(state => ({
          [jogador]: {
            ...state[jogador],
            mao: [
              ...state[jogador].mao,
              state[jogador].deck.pop()
            ]
          }
        }))

      } else {

        // Caso não haja, verificar se há cartas no descarte
        if(this.state[jogador].descarte.length){

          // Se houver, embaralhar o descarte e colocar no deck
          // Após isso, no callback, comprar uma carta
          this.setState(state => ({
            [jogador]: {
              ...state[jogador],
              deck: shuffle(state[jogador].descarte),
              descarte: []
            }
          }), () => this.setState(state => ({
            [jogador]: {
              ...state[jogador],
              mao: [
                ...state[jogador].mao,
                state[jogador].deck.pop()
              ]
            }
          })))

        }

      }

    }

  }

  enviarDaMao = (jogador, id, tipo) => {

    const mao = this.state[jogador].mao

    const destino = helpers.selecionaDestino(tipo)

    this.setState(state => ({
      [jogador] : {
        ...state[jogador],
        mao: state[jogador].mao.filter(item => item.id !== id ),
        [destino] : [
          ...state[jogador][destino],
          state[jogador].mao.find(item => item.id === id )
        ]
      }
    }))
  }

  descartar = (origem, id) => {

    const { jogadorAtual } = this.state

    this.setState(state => ({
      [jogadorAtual]: {
        ...state[jogadorAtual],
        [origem]: state[jogadorAtual][origem].filter(item => item.id !== id),
        descarte: [
          ...state[jogadorAtual].descarte,
          state[jogadorAtual][origem].find(item => item.id === id)
        ]
      }
    }))

  }

  reservar = (origem, nome, tipo) => {

    const { jogadorAtual } = this.state

    if(origem === 'mercado')
    {
      this.setState(state => ({
        [jogadorAtual]: {
          ...state[jogadorAtual],
          mercado: state[jogadorAtual].mercado.map(item => {
            if(item.nome === nome)
              item.qtd--
            return item
          }),
          descarte: [
            ...state[jogadorAtual].descarte,
            { nome, tipo, id: uuidv1(), coins: 0}
          ]
        }
      })) 
    } else {
      this.setState(state => ({
        ...state,
        templos: state.templos.map(item => {
          if(item.nome === nome)
            item.qtd--
          return item
        }),
        [jogadorAtual]: {
          ...state[jogadorAtual],
          descarte: [
            ...state[jogadorAtual].descarte,
            { nome, tipo, id: uuidv1() }
          ]
        }
      }))
    }

  }

  enviarDaLoja = (nome) => {

    const jogador = this.state.jogadorAtual
    const mercado = this.state[jogador].mercado
    const indice = mercado.findIndex(item => item.nome === nome)
    const carta = this.state[jogador].mercado[indice]
    const destino = helpers.selecionaDestino(carta.tipo)

    if(carta.qtd > 0){

      this.setState(state => ({
        [jogador]: {
          ...state[jogador],
          mercado: state[jogador].mercado.map(item => {
            if(item.nome === nome)
              item.qtd--
            return item
          }),
          [destino]: [
            ...state[jogador][destino],
            { nome: carta.nome, tipo: carta.tipo, id: uuidv1(), coins: 0 }
          ]

        }
      }))

    }
    
  }

  enviarTemploMaior = nome => {

    const { jogadorAtual, templos } = this.state

    const templo = this.state.templos.find(item => item.nome === nome)

    if(templo.qtd - 1 >= 0){

      this.setState(state => ({
        ...state,
        templos: state.templos.map(item => {
          if(item.nome === nome)
            item.qtd--
          return item
        }),
        [jogadorAtual]: {
          ...state[jogadorAtual],
          terreno: [
            ...state[jogadorAtual].terreno,
            { nome, tipo: 'terreno', id: uuidv1() }
          ]
        }
      }))

    }

  }

  atacar = id => {

    const jogador = this.state.jogadorAtual

    this.setState(state => ({
      [jogador]: {
        ...state[jogador],
        battlefield: state[jogador].battlefield.filter(item => item.id !== id),
        ataque: [
          ...state[jogador].ataque,
          state[jogador].battlefield.find(item => item.id === id)
        ]
      }
    }))
  }

  voltar = id => {

    const jogador = this.state.jogadorAtual

    this.setState(state => ({
      [jogador]:{
        ...state[jogador],
        ataque: state[jogador].ataque.filter(item => item.id !== id),
        battlefield: [
          ...state[jogador].battlefield,
          state[jogador].ataque.find(item => item.id === id)
        ]
      }
    }))

  }

  virar = (origem, id) => {

    const { jogadorAtual } = this.state
    
    this.setState(state => ({
      [jogadorAtual]: {
        ...state[jogadorAtual],
        [origem]: state[jogadorAtual][origem].map(carta => {
          if(carta.id === id){
            if(carta.virada)
              carta.virada = false
            else
              carta.virada = true
          }
          return carta
        })
      }
    }))

  }

  mudarVida = (jogador, operacao, passo) => {


    if(operacao === 'add'){

      this.setState(state => ({
        [jogador]: {
          ...state[jogador],
          vida: state[jogador].vida + passo
        }
      }))

    } else {

      if(this.state[jogador].vida - passo >= 0){

        this.setState(state => ({
          [jogador]: {
            ...state[jogador],
            vida: state[jogador].vida - passo
          }
        }))

      }

    }

  }

  mudarMoedas = (jogador, operacao, passo) => {
    // Caso a operação seja de adição
    if(operacao === 'add'){
      this.setState(state => ({
        [jogador]: {
          ...state[jogador],
          ouro: state[jogador].ouro + passo
        }
      }))
    } else {
      //Testar se essa diminuição levaria a um valor menor do que zero.
      if(this.state[jogador].ouro - passo >= 0){
        this.setState(state => ({
          [jogador]: {
            ...state[jogador],
            ouro: state[jogador].ouro - passo
          }
        }))
      }
    }
  }

  mudarMoedasCarta = (operacao, passo, origem, id) => {
      
    const { jogadorAtual } = this.state

    const carta = this.state[jogadorAtual][origem].find(item => item.id === id)

    console.log(this.state[jogadorAtual][origem])

    if(operacao === 'add'){
      this.setState(state => ({
        [jogadorAtual]: {
          ...state[jogadorAtual],
          [origem]: state[jogadorAtual][origem].map(item => {
            if(item.id === id)
              item.coins += passo
            return item
          })
        }
      }))
    } else {
      if(carta.coins && carta.coins - 1 >= 0){
        this.setState(state => ({
          [jogadorAtual]: {
            ...state[jogadorAtual],
            [origem]: state[jogadorAtual][origem].map(item => {
              if(item.id === id)
                item.coins -= passo
              return item
            })
          }
        }))
      }
    }
  }

  render() {
    
    const { jogadorAtual, templos } = this.state

    const player1 = this.state[jogadorAtual];
    const player2 = this.state[this.state.oponente];
    const mercado = player1.mercado

    return (
      <div id="game-area">

        <HUD 
          moedas={player1.ouro} 
          vida={player1.vida} 
          sacar={() => this.sacar(jogadorAtual, 1)}
          aumentarVida={() => this.mudarVida(jogadorAtual, 'add', 1)}
          reduzirVida={() => this.mudarVida(jogadorAtual, 'remove', 1)}
          aumentarMoedas={() => this.mudarMoedas(jogadorAtual, 'add', 1)}
          reduzirMoedas={() => this.mudarMoedas(jogadorAtual, 'remove', 1)}
        />

        <Mercado 
          position="left" 
          itens={mercado} 
          enviar={this.enviarDaLoja} 
          enviarTemplo={this.enviarTemploMaior} 
          templo={templos[0]}
          reservar={this.reservar}
          />

        <Mercado 
          position="right" 
          itens={mercado} 
          enviar={this.enviarDaLoja} 
          enviarTemplo={this.enviarTemploMaior} 
          templo={templos[1]} 
          reservar={this.reservar}
          />

        <Hand 
          position="lower" 
          cards={player1.mao} 
          enviarDaMao={this.enviarDaMao} 
          jogador={jogadorAtual}
          descartar={this.descartar}
        />

        <div id="room">
          <div id="table">

            <Side 
              side="sideA" 
              terreno={this.state.player1.terreno} 
              battlefield={this.state.player1.battlefield}
              ataque={this.state.player1.ataque}
              descartar={this.descartar}
              atacar={this.atacar}
              virar={this.virar}
              voltar={this.voltar}
              mudarMoedas={this.mudarMoedasCarta}
            />

            <Side 
              side="sideB" 
              terreno={this.state.player2.terreno} 
              battlefield={this.state.player2.battlefield}
              ataque={this.state.player2.ataque}
            />

          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
