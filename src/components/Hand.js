import React, { Component } from 'react'

import Card from './Card'

class Hand extends Component {
	render(){

		const { cards } = this.props

		return(
			<div className={'hand ' + this.props.position}>
				{cards && cards.map(card => (
					<Card name={card.nome} />
				))}
			</div>
		)
	}
}

export default Hand