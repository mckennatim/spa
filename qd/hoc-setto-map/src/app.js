import React from 'react'
import ReactDOM from 'react-dom';
import {App} from './comp'


const state ={
	name: 'Ulysses'
}

const container = document.getElementById('app');

ReactDOM.render(<App {...state} />, container)
