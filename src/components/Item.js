import React, { Component } from 'react'

import Menu from './Menu'

class Item extends Component {

	enviarCarta = () => {

		const { enviar, nome } = this.props

		enviar(nome)

	}

	reservarCarta = () => {

		const { nome, tipo, reservar } = this.props

		reservar(nome, tipo)

	}

	render(){

		const { nome, qtd, enviar } = this.props

		return(
			<div className="item_quadrado" style={{ backgroundImage: `url(/cards/${nome}.png)`, position: 'relative'}}>
				<div className="qtd_icon">
					<span className="qtd_number">{qtd}</span>
				</div>
				<Menu acoes={{
					enviar: this.enviarCarta,
					reservar: this.reservarCarta
				}}/>
			</div>
		)
	}
}

export default Item