import {Home} from './components'

const initState = {
  mqtt: {
    currentDevId: '00002zzz',
    currentDev: {
      specs: {
        notTimerTags: ["temp", "onoff", "hilimit", "lolimit"]
      }
    },
    currentApps: {
      apps: [{appid: 'none', devid: 'nothing'}],
      id: 'no one'
    },
    devices: [
      {
        id: 'CYURD001',
        name: 'geniot',
        desc: '2 temps, 3 timers 1 relay demo board',
        location: {
          lat: 222,
          lon: 333,
          zip: '02130',
          street: '12 Parley Vale',
          city: 'Jamaica Plain',
          state: 'MA'
        },
        specs: {
          HAStIMER: 28,
          notTimerTags: ["temp", "onoff", "hilimit", "lolimit"]
        }
      },
      {
        id: 'CYURD002',
        name: 'cascada',
        desc: '3 timers 2 relays for waterfall and garden',
        location: {
          lat: 222,
          lon: 333,
          zip: '02130',
          street: '12 Parley Vale',
          city: 'Jamaica Plain',
          state: 'MA'
        },
        specs: {
          HAStIMER: 28,
          notTimerTags: ["temp", "onoff", "hilimit", "lolimit"]
        }
      }
    ],
    timr: {tIMElEFT:[0,0,0]},
    flags: {HAStIMR: 28},
    srstate: []
  },
	test: {
		name: 'Harry',
		rtpg: Home,
		users: ['doggy', 'freddy', 'timmy', 'kelly', 'brian' , 'david', 'colleen', 'megan', 'shaun', 'erin' ]
	}
};

const initialBrowser = () => {
  let ws = window.innerWidth
  let devInfo ={
    types: ['watch', 'phone', 'phoneL', 'tablet', 'tabletL', 'laptop', 'monitor'],
    sizes: [300, 500, 600, 800, 900, 1800, 3000],
    browser: '',
    size: ws,
    page: {name: 'Home', params: null}
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
