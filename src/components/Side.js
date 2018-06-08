import React, { Component } from 'react'
import Card from "./Card"

class Side extends Component {

	virarTerreno     = id => this.props.virar('terreno',     id)
	virarBattlefield = id => this.props.virar('battlefield', id)	
	virarAtaque      = id => this.props.virar('ataque',      id)

	mudarMoedasBattlefield = (operacao, passo, id) => this.props.mudarMoedas(operacao, passo, 'battlefield', id)
	mudarMoedasAtaque = (operacao, passo, id) => this.props.mudarMoedas(operacao, passo, 'ataque', id)

	render(){

		const { terreno, battlefield, ataque, descartar, atacar, voltar } = this.props

		return(
			<div className="side" id={this.props.side}>

				<div className="terreno">
					{terreno.map(carta => (
						<Card 
							virada={carta.virada} 
							key={carta.id} 
							carta={carta} 
							acoes={{
								descartar: () => descartar('terreno', carta.id),
								virar: () => this.virarTerreno(carta.id)
							}}
						/>
					))}
				</div>
				<div className="battlefield">
					{battlefield.map(carta => (
						<Card 
							showCoins={true} 
							virada={carta.virada} 
							key={carta.id} 
							carta={carta} 
							acoes={{
								atacar: () => atacar(carta.id),
								virar: () => this.virarBattlefield(carta.id),
								descartar: () => descartar('battlefield', carta.id),
							}}
							mudarMoedas={this.mudarMoedasBattlefield}
						/>
					))}
				</div>
				<div className="ataque">
					{ataque.map(carta => (
						<Card 
							showCoins={true} 
							virada={carta.virada} 
							key={carta.id} 
							carta={carta} 
							acoes={{
								virar: () => this.virarAtaque(carta.id),
								descartar: () => descartar('ataque', carta.id),
								voltar: () => voltar(carta.id)
							}}
							mudarMoedas={this.mudarMoedasAtaque}
						/>
					))}
				</div>

      </div>
		)
	}
}

export default Side