import React, { Component } from 'react'

import Moedas from './Moedas'
import Vida from './Vida'
import Deck from './Deck'
import Templo2 from './Templo2'
import Templo3 from './Templo3'
import Opcoes from './Opcoes'

class HUD extends Component {
	render(){

		const { 
						moedas, 
						vida, 
						sacar, 
						aumentarVida, 
						reduzirVida,
						aumentarMoedas,
						reduzirMoedas,
		} = this.props

		return(
			<div className="hud">
				<Moedas valor={moedas} aumentar={aumentarMoedas} reduzir={reduzirMoedas} />
				<Vida valor={vida} aumentar={aumentarVida} reduzir={reduzirVida}/>
				<Deck sacar={sacar}/>
				<Templo2 />
				<Templo3 />
				<Opcoes />
			</div>
		)
	}
}

export default HUD