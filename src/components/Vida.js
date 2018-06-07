import React, { Component } from 'react'

class Vida extends Component {
	render(){

		const { valor, aumentar, reduzir } = this.props

		return(
			<div className="vida">
				<span>{valor}</span>
				<button className="add" onClick={aumentar}>+</button>
				<button className="remove" onClick={reduzir}>-</button>
			</div>
		)
	}
}

export default Vida