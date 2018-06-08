import React, { Component } from 'react'

import Menu from './Menu'
import Moedas from './Moedas'

class Card extends Component {

	aumentar = id => this.props.mudarMoedas('add', 1, id)
	reduzir  = id => this.props.mudarMoedas('remove', 1, id)

	render(){

		const { carta, coins, angulo, margem, jogador, acoes, virada, showCoins } = this.props

		return(
			<div className={virada ? "card virado" : "card"} style={{transform: `rotate(${angulo}deg) translate(0px, ${margem}px)`}} >
				<Menu descartar={true} acoes={acoes} />
				{showCoins && ( <Moedas valor={carta.coins} aumentar={() => this.aumentar(carta.id)} reduzir={() => this.reduzir(carta.id)}/> )}
				<img src={`/cards/${carta.nome}.png`} />
			</div>
		)
	}
}

export default Card