import React, { Component } from 'react'

class Menu extends Component {
	render(){

		const { descartar, enviar } = this.props

		return(
			<div className="options">
				<button className="enviar" onClick={enviar}>Enviar</button>
				<button className="reservar">Reservar</button>
				{descartar && (
					<button className="descartar">Descartar</button>
				)}
			</div>
		)
	}
}

export default Menu