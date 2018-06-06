import React, { Component } from 'react'

class Card extends Component {
	render(){

		const { name, qtd, coins, angulo, margem } = this.props

		return(
			<div className="card">

				{qtd && (
					<div className="qtd_icon">
						<span className="qtd_number">{qtd}</span>
					</div>
				)}

				<img src={`/cards/${name}.png`} style={{transform: `rotate(${angulo}deg) translate(0px, ${margem}px)`}}/>
			</div>
		)
	}
}

export default Card