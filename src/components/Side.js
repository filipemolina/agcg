import React, { Component } from 'react'
import Card from "./Card"

class Side extends Component {
	render(){

		const { pilhas } = this.props

		return(
			<div className="side" id={this.props.side}>

				<div className="pilha">
					{pilhas.map(pilha => (
						<Card name={pilha.nome} qtd={pilha.qtd} key={pilha.nome}/>
					))}
				</div>
				<div className="terreno"></div>
				<div className="battlefield"></div>

      </div>
		)
	}
}

export default Side