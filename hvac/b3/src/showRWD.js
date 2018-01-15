import * as compoi from './components'

const dog='uli'
const showRWD=(state)=>{
	let elArr = []
  const {types, sizes, browser, size, page} = state.responsive
  const pageName = page.name
	console.log(pageName);
  const browserTypeIdx = types.indexOf(browser)
  const panesPerType = compoi.panes[browserTypeIdx]
  const pageList = compoi.multi.filter((amul,i)=>(amul.pri==pageName))
  if(pageList.length==0){ //if there is no multi array for the page
    //try{
      // console.log(pageName)
      // console.log(compoi[pageName](state))
      const singleElement = compoi[pageName](state)
      elArr.push(singleElement)
    // }catch(err){
    //   console.error('There is no page named '+pageName + err)
    // }
  }else{
    const multiList= pageList[0].mul.filter((mu)=>(mu.length==panesPerType))
    if (multiList.length==0){ // if the multilist is empty
      const singleElement = compoi[pageName](state)
      elArr.push(singleElement)
    }else{//use the array matching the panesPerType size and add all its names to the element arrray
      const elList = multiList[0].map((pgStr, i)=>{
        const pg = compoi[pgStr](state)
        return pg
      })
      elArr = elList
    }
  }
  return elArr
}

export {showRWD, dog}
