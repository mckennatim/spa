import React from 'react'

function isClassComponent(component) {
    return (
        typeof component === 'function' &&
        !!component.prototype.isReactComponent
    ) ? true : false
}

function isFunction(component) {
    return (
        typeof component === 'function'
    ) ? true : false;
}

function isFunctionComponent(component) {
    return (
        typeof component === 'function' &&
        String(component).includes('return React.createElement')
    ) ? true : false;
}

function isReactComponent(component) {
    return (
        isClassComponent(component) ||
        isFunctionComponent(component)
    ) ? true : false;
}

function isElement(element) {
    return React.isValidElement(element);
}

function isDOMTypeElement(element) {
    return isElement(element) && typeof element.type === 'string';
}

function isCompositeTypeElement(element) {
    return isElement(element) && typeof element.type === 'function';
}

export{isClassComponent, isFunction, isFunctionComponent, isReactComponent, isElement, isDOMTypeElement, isCompositeTypeElement}

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
