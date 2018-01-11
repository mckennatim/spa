const initState = {
	test: {
		name: 'Harry'
	}
};


const initialBrowser = () => {
  let ws = window.innerWidth
  let devInfo ={
    types: ['watch', 'phone', 'phoneL', 'tablet', 'tabletL', 'laptop'],
    sizes: [300, 500, 600, 800, 900, 1800],
    browser: '',
    size: ws,
    page: {name: 'Home', params: {}}
  }
  var typeIdx
  devInfo.sizes.reduce((t, n, i)=>{
    if(t<ws&&ws<=n){typeIdx = i}
    return n
  },0);
  devInfo.browser = devInfo.types[typeIdx]
  return devInfo
}

initState.responsive = initialBrowser()
export {initState}
