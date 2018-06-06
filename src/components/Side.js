import React, { Component } from 'react'
import Card from "./Card"

class Side extends Component {
	render(){

		const { terreno, battlefield } = this.props

		return(
			<div className="side" id={this.props.side}>

				<div className="terreno">
					{terreno.map(carta => (
						<Card nome={carta.nome} />
					))}
				</div>
				<div className="battlefield">
					{battlefield.map(carta => (
						<Card nome={carta.nome} />
					))}
				</div>
				<div className="ataque"></div>

      </div>
		)
	}
}

export default Side