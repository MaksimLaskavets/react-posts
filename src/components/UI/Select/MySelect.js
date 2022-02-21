import React, { useState } from 'react'




function MySelect({ options, defaultValue, value, onChange }) {


	return (

		<select style={{borderRadius:'10px'}}
			value={value}
			onChange={event => onChange(event.target.value)} >
			<option disabled value=''>{defaultValue}</option>
			{
				options.map(option =>
					<option key={option.value} value={option.value}>
						{option.name}
					</option>
				)
			}
		</select >

	)
}

export default MySelect