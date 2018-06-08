import React, { Component } from 'react'

import Item from "./Item"

class Mercado extends Component {

	reservarMercado = (nome, tipo) => this.props.reservar('mercado', nome, tipo)

	reservarTemplo  = (nome, tipo) => this.props.reservar('templos', nome, tipo)

	render(){

		const { position, itens, enviar, reservar, enviarTemplo, templo } = this.props

		const itens_mostrados = position === "left" 
															? itens.filter((item, i) => i < 4 )
															: itens.filter((item, i) => i >= 4)

		return(
			<div className={"mercado " + position}>
				{itens_mostrados.map(item => (
					<Item 
						nome={item.nome}
						tipo={item.tipo}
						qtd={item.qtd} 
						key={item.nome} 
						enviar={enviar} 
						reservar={this.reservarMercado}
					/>
				))}

				<Item 
					nome={templo.nome}
					tipo={templo.tipo} 
					qtd={templo.qtd} 
					key={templo.nome} 
					enviar={enviarTemplo}
					reservar={this.reservarTemplo}
				/>
			</div>
		)
	}
}

export default Mercado