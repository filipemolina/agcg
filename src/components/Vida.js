import React, { Component } from 'react'

class Vida extends Component {
	render(){

		const { valor } = this.props

		return(
			<div className="vida">
				<span>{valor}</span>
			</div>
		)
	}
}

export default Vida