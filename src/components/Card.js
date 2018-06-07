import React, { Component } from 'react'

import Menu from './Menu'

class Card extends Component {

	render(){

		const { carta, coins, angulo, margem, jogador, acoes } = this.props

		return(
			<div className={"card"} style={{transform: `rotate(${angulo}deg) translate(0px, ${margem}px)`}} >
				<Menu descartar={true} acoes={acoes} />
				<img src={`/cards/${carta.nome}.png`} />
			</div>
		)
	}
}

export default Card