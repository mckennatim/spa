import {Home} from './components'

const initState = {
  test: {
    name: 'Harry',
    rtpg: Home,
    users: ['doggy', 'freddy', 'timmy', 'kelly', 'brian' , 'david', 'colleen', 'megan', 'shaun', 'erin', 'doggy', 'freddy', 'timmy', 'kelly', 'brian' , 'david', 'colleen', 'megan', 'shaun', 'erin' ]
  },
  cambio: {
    page: {name: 'Home', params: null}
  },
  ejob: {
    job:'Job', 
    categories:'Categories-comma separated or none', 
    idx:0, 
    active:0}
};

const initialBrowser = () => {
  let ws = window.innerWidth
  let devInfo ={
    types: ['watch', 'phone', 'phoneL', 'tablet', 'tabletL', 'laptop', 'monitor'],
    sizes: [300, 500, 600, 800, 900, 1800, 3000],
    browser: '',
    size: ws
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
