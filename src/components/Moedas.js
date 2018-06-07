import React, { Component } from 'react'

class Moedas extends Component {
	render(){

		const { valor, aumentar, reduzir } = this.props

		return(
			<div className="moedas">
				<span>{valor}</span>
				<button className="add" onClick={aumentar}>+</button>
				<button className="remove" onClick={reduzir}>-</button>
			</div>
		)
	}
}

export default Moedas