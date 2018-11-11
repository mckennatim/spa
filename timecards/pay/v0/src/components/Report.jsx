import React from 'react'// eslint-disable-line no-unused-vars
import {mapClass2Element} from '../hoc/mapClass2Element'
import {Taxes} from './Taxes.jsx'// eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';// eslint-disable-line no-unused-vars
import Tabs from '@material-ui/core/Tabs';// eslint-disable-line no-unused-vars
import Tab from '@material-ui/core/Tab';// eslint-disable-line no-unused-vars
import Typography from '@material-ui/core/Typography';// eslint-disable-line no-unused-vars

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class Report extends React.Component{
  state = {
    value: 0,
  };
  active='mabibi'

  componentDidMount=()=>{
    this.getReport()
  }  

  handleChange = (event, value) => {
    this.setState({ value });
  };
  

  getReport=()=>{
    console.log('dog')
  }
  render=()=>{
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Taxes" />
            <Tab label="JobCosts" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><Taxes/></TabContainer>}
        {value === 1 && <TabContainer>JobCosts</TabContainer>}
      </div>
    );
  }
}

Report = withStyles(styles, { withTheme: true })(Report)
Report = mapClass2Element(Report)

export {Report}

// const style = {
//   he:{
//     overflow:'hidden',
//     margin: '2px 10px 10px 10px',
//     padding: '4px',
//     background: '#C4A265'
//   }
// }