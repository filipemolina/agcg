import React, { Component } from 'react'

import Menu from './Menu'

class Item extends Component {
	render(){

		const { nome, qtd } = this.props

		return(
			<div className="item_quadrado" style={{ backgroundImage: `url(/cards/${nome}.png)`, position: 'relative'}}>
				<div className="qtd_icon">
					<span className="qtd_number">{qtd}</span>
				</div>
				<Menu />
			</div>
		)
	}
}

export default Item