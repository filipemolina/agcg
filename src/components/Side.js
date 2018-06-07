import React, { Component } from 'react'
import Card from "./Card"

class Side extends Component {
	render(){

		const { terreno, battlefield, ataque, descartar, atacar } = this.props

		return(
			<div className="side" id={this.props.side}>

				<div className="terreno">
					{terreno.map(carta => (
						<Card key={carta.id} carta={carta} acoes={{
							descartar: () => descartar('terreno', carta.id),
						}}/>
					))}
				</div>
				<div className="battlefield">
					{battlefield.map(carta => (
						<Card key={carta.id} carta={carta} acoes={{
							atacar: () => atacar(carta.id),
							virar: true,
							descartar: () => descartar('battlefield', carta.id),
						}}/>
					))}
				</div>
				<div className="ataque">
					{ataque.map(carta => (
						<Card key={carta.id} carta={carta} acoes={{
							descartar: () => descartar('ataque', carta.id),
						}} />
					))}
				</div>

      </div>
		)
	}
}

export default Side