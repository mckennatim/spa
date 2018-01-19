import React from 'react'
import {cfg, ls} from '../utilities/getCfg'
import {fetchFor, mapClass2Element} from '../hoc'


var tops = {dog: 'Ulysses'}

let LocList = (props)=>{
	console.log(props);
	const {isLoading, data, message} = props
	const listItems= data.map((item, i)=>{
		return(
			<li key={i}>{item}</li>
		)
	})
	const maybeLoad=()=>{
		if(isLoading){
			return (<p>{message}</p>)
		}else{
			return(<div>
				<ul>{listItems}</ul>
			</div>)
		}
	};
	const ml = maybeLoad()
	return(
		<div >
			<h3> Location List </h3>
			{ml}
		</div>
	)
}

const fconfig = {
	url: cfg.url.api+'/dedata/loclist/'+cfg.appid+'/',
	options: {headers: {'Authorization': 'Bearer '}},
}

LocList = mapClass2Element(fetchFor(LocList, fconfig))
export {LocList}

// function isClassComponent(component) {
//     return (
//         typeof component === 'function' &&
//         !!component.prototype.isReactComponent
//     ) ? true : false
// }
//
// function isFunction(component) {
//     return (
//         typeof component === 'function'
//     ) ? true : false;
// }
//
// function isFunctionComponent(component) {
//     return (
//         typeof component === 'function' &&
//         String(component).includes('return React.createElement')
//     ) ? true : false;
// }
//
// function isReactComponent(component) {
//     return (
//         isClassComponent(component) ||
//         isFunctionComponent(component)
//     ) ? true : false;
// }
//
// function isElement(element) {
//     return React.isValidElement(element);
// }
//
// function isDOMTypeElement(element) {
//     return isElement(element) && typeof element.type === 'string';
// }
//
// function isCompositeTypeElement(element) {
//     return isElement(element) && typeof element.type === 'function';
// }
//
// console.log('for <LocList />');
// console.log('isReactComponent ',isReactComponent(<LocList />))
// console.log('isClassComponent ',isClassComponent(<LocList />))
// console.log('isFunction ',isFunction(<LocList />))
// console.log('isFunctionComponent ',isFunctionComponent(<LocList />))
// console.log('isElement ',isElement(<LocList />))
// console.log('isDOMTypeElement ',isDOMTypeElement(<LocList />))
// console.log('isCompositeTypeElement ', isCompositeTypeElement(<LocList />))
//
// console.log('for LocList');
// console.log('isReactComponent ',isReactComponent(LocList))
// console.log('isClassComponent ',isClassComponent(LocList))
// console.log('isFunction ',isFunction(LocList))
// console.log('isFunctionComponent ',isFunctionComponent(LocList))
// console.log('isElement ',isElement(LocList))
// console.log('isDOMTypeElement ',isDOMTypeElement(LocList))
// console.log('isCompositeTypeElement ', isCompositeTypeElement(LocList))
//
// console.log(LocList(tops));
// console.log('isReactComponent ',isReactComponent(LocList(tops)))
// console.log('isClassComponent ',isClassComponent(LocList(tops)))
// console.log('isFunction ',isFunction(LocList(tops)))
// console.log('isFunctionComponent ',isFunctionComponent(LocList(tops)))
// console.log('isElement ',isElement(LocList(tops)))
// console.log('isDOMTypeElement ',isDOMTypeElement(LocList(tops)))
// console.log('isCompositeTypeElement ', isCompositeTypeElement(LocList(tops)))
//
// console.log('for noclist');
// console.log('isReactComponent ',isReactComponent(NocList))
// console.log('isClassComponent ',isClassComponent(NocList))
// console.log('isFunctionComponent ',isFunctionComponent(NocList))
// console.log('isElement ',isElement(NocList))
// console.log('isDOMTypeElement ',isDOMTypeElement(NocList))
// console.log('isCompositeTypeElement ', isCompositeTypeElement(NocList))
//
// console.log('for <noclist />');
// console.log('isReactComponent ',isReactComponent(<NocList />))
// console.log('isClassComponent ',isClassComponent(<NocList />))
// console.log('isFunctionComponent ',isFunctionComponent(<NocList />))
// console.log('isElement ',isElement(<NocList />))
// console.log('isDOMTypeElement ',isDOMTypeElement(<NocList />))
// console.log('isCompositeTypeElement ', isCompositeTypeElement(<NocList />))
