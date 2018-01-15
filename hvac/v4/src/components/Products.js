import React from	'react'
import {geta} from '../utilities'
import {pStyle} from '../styles'
const style = {
	...pStyle, outer: {...pStyle.outer, background: '#99FF99'}
}

const Products = (props) =>{
	// console.log(geta)
	const renderProducts=()=> {
		if(geta('props.responsive.page.params', props)){
			return(
				<div>
				<h3> Product</h3>
				<h4>pruduct ID: {props.responsive.page.params.id} description: {props.responsive.page.params.inv}</h4>
		    </div>
		  );
		} else {
			return(
				<div>
				<h3> Products</h3>
		    <ul>{ props.test.users.map((user, index) => <li key={index}>{user}</li>) }</ul>
		    </div>
		  );
		}
	}

	return(
		<div style={style.outer}>
			{renderProducts()}
		</div>
	)
}

export{Products}
