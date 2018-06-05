import React, { Component } from 'react'

class Card extends Component {
	render(){

		const { name, qtd, coins } = this.props

		return(
			<div className="card">

				{qtd && (
					<div className="qtd_icon">
						<span className="qtd_number">{qtd}</span>
					</div>
				)}

				<img src={`/cards/${name}.png`}/>
			</div>
		)
	}
}

export default Card