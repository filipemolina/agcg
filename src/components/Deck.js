import React, { Component } from 'react'

class Deck extends Component {
	render(){

		const { sacar } = this.props

		return(
			<div className="deck-principal">
				<button onClick={sacar}>Sacar</button>
			</div>
		)
	}
}

export default Deck	