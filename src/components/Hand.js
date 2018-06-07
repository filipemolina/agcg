import React, { Component } from 'react'

import Card from './Card'

class Hand extends Component {

	state = {
		cards_qtd: 0,
		angles: [],
	}

	angulo_geral = 5
	margem_geral = 10

	componentDidMount = () => {
		this.setState({
			cards_qtd: this.props.cards.length
		})
	}

	// Cacula o ângulo que uma carta tem que estar virada quando está em uma mão.
	calcularAngulos = (qtd, angulo, posicao) => {

		const is_par = qtd % 2 === 0
		let inicio

		if(is_par)
			inicio = qtd / -2
		else
			inicio = (qtd-1) / -2

		// Quando é par, evitar a posição 0
		if(inicio + posicao === 0 && is_par){
			posicao++
		}

		const angulo_final = (inicio + posicao) * angulo

		return angulo_final

	}

	calcularMargem = (qtd, margem, posicao) => {

		const is_par = qtd % 2 === 0
		let meio
		let distancia
		let margem_final
		let fator

		// Calcular o meio
		if(is_par){
			meio = qtd / 2 - 1

			// Isso deve ser feito pois uma quantidade par de cartas possui 2 "meios"
			if(posicao > meio)
				posicao--

			// Calcular a distancia do meio
			distancia = Math.abs(posicao - meio)

			// Calcular o fator pelo qual a margem deve ser multiplicada, baseada na distância
			// Soma de todos os números de 1 até N é (N * (N+1)) / 2
			fator = (distancia * (distancia + 1)) / 2
		}
		else {
			meio = Math.ceil(qtd / 2) - 1
			// Calcular a distancia do meio
			distancia = Math.abs(posicao - meio)

			// Calcular o fator pelo qual a margem deve ser multiplicada, baseada na distância
			// Soma de todos os números de 1 até N é (N * (N+1)) / 2
			fator = (distancia * (distancia + 1)) / 2
		}

		return fator * margem
	}

	enviarCarta = (carta) => {

		const { jogador } = this.props

		this.props.enviarDaMao(jogador, carta.id, carta.tipo)

	}


	// Calcula a margem superior que deve ser aplicada a cada carta

	render(){

		const { cards, position } = this.props
		const qtd_cartas = this.props.cards.length

		return(
			<div className={'hand ' + position}>
				{cards && cards.map((card, i) => (
					<Card 
						carta={card}
						key={card.id} 
						angulo={this.calcularAngulos(qtd_cartas, this.angulo_geral, i)}
						margem={this.calcularMargem(qtd_cartas, this.margem_geral, i)}
						acoes={{
							enviar: () => this.enviarCarta(card),
							descartar: () => this.props.descartar('mao', card.id)
						}}
					/>
				))}
			</div>
		)
	}
}

export default Hand