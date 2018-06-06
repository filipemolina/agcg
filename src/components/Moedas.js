import React, { Component } from 'react'

class Moedas extends Component {
	render(){

		const { valor } = this.props

		return(
			<div className="moedas">
				<span>{valor}</span>
			</div>
		)
	}
}

export default Moedas