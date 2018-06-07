import React, { Component } from 'react'

import Item from "./Item"

class Mercado extends Component {
	render(){

		const { position, itens } = this.props

		const itens_mostrados = position === "left" 
															? itens.filter((item, i) => i < 4 )
															: itens.filter((item, i) => i >= 4)

		return(
			<div className={"mercado " + position}>
				{itens_mostrados.map(item => (
					<Item nome={item.nome} qtd={item.qtd} key={item.nome}/>
				))}
			</div>
		)
	}
}

export default Mercado