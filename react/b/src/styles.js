var mStyle = {
  li: {
    display: 'inline',
    padding: '2px',
    paddingRight: '4px',
    backgroundColor: '#FFFFCC'
  },
  ul: {
  },
  span:{
    color: 'yellow'
  },
  div: {
    height: '900',
    background: 'white'
  },
  a: {
    textDecoration: 'none',
    color: 'green'
  }
};

const pStyle= {
  outer: {
    display: 'flex',
    flexDirection: 'column',
    background:'white',
    height: 400,
    textAlign: 'center'    
  },
  inner: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    height: 340,
    color: 'red',
    textAlign: 'center',
    fontSize: '300%'
  }
}

export {mStyle, pStyle}