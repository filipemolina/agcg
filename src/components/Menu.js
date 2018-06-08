import React, { Component } from 'react'

class Menu extends Component {
	render(){

		const { enviar, reservar, descartar, virar, atacar, voltar } = this.props.acoes

		return(
			<div className="options">
				{enviar    && (<button className="enviar"    onClick={enviar}>Enviar        </button> )}
				{reservar  && (<button className="reservar"  onClick={reservar}>Reservar    </button> )}
				{descartar && (<button className="descartar" onClick={descartar}>Descartar  </button> )}
				{virar     && (<a className="virar" onClick={virar}></a> )}
				{atacar    && (<a className="atacar" onClick={atacar}></a>)}
				{voltar    && (<a className="voltar" onClick={voltar}></a>)}
			</div>
		)
	}
}

export default Menu