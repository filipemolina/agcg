import React, { Component } from 'react'

import Card from './Card'

class Hand extends Component {

	state = {
		cards_qtd: 0,
		angles: [],
	}

	angulo_geral = 5

	componentDidMount = () => {
		this.setState({
			cards_qtd: this.props.cards.length
		})
	}

	// Cacula o ângulo que uma carta tem que estar virada quando está em uma mão.
	calcularAngulos = (qtd, angulo, posicao) => {

		const is_par = qtd % 2 == 0
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

		return {
			angulo: angulo_final,
			margem: Math.abs(angulo_final) * Math.abs(angulo_final)
		}

	}

	// Calcula a margem superior que deve ser aplicada a cada carta

	render(){

		const { cards, position } = this.props
		const qtd_cartas = this.props.cards.length

		return(
			<div className={'hand ' + position}>
				{cards && cards.map((card, i) => (
					<Card 
						name={card.nome} 
						key={card.nome} 
						angulo={this.calcularAngulos(qtd_cartas, this.angulo_geral, i).angulo}
						margem={this.calcularAngulos(qtd_cartas, this.angulo_geral, i).margem}
					/>
				))}
			</div>
		)
	}
}

export default Hand