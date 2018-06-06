import React, { Component } from 'react'

import Menu from './Menu'

class Card extends Component {

	enviarCarta = () => {

		console.log("CLICOU")

		const { jogador, nome, tipo } = this.props

		this.props.enviarDaMao(jogador, nome, tipo)
	}

	render(){

		const { nome, qtd, coins, angulo, margem, tipo, jogador } = this.props

		return(
			<div className="card" style={{transform: `rotate(${angulo}deg) translate(0px, ${margem}px)`}} >
				<Menu descartar={true} enviar={this.enviarCarta} />
				<img src={`/cards/${nome}.png`} />
			</div>
		)
	}
}

export default Card