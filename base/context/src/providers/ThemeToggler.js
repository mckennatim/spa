import React from 'react' // eslint-disable-line no-unused-vars

type Theme = 'light' | 'dark';// eslint-disable-line no-unused-vars
// Pass a default theme to ensure type correctness
const ThemeContext = React.createContext('light');// eslint-disable-line no-unused-vars

class ThemeToggler extends React.Component {// eslint-disable-line no-unused-vars
  state = {theme: 'light'};
  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <button
          onClick={() =>{
            this.setState(state => ({
              theme: state.theme === 'light' ? 'dark' : 'light',
            }))
          }}>
          Toggle Atheme
        </button>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export {ThemeToggler, ThemeContext}