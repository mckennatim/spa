var React = require('react');
var Pond = require('./Pond');
var Spot = require('./Spot2');


var Spots = React.createClass({
	comingUserInput: function(timerSet){
		var tstr = JSON.stringify(timerSet);
		var tobj = JSON.parse(tstr);
		tobj.state='waiting'
		this.props.spots[tobj.spot].state='waiting';	
		this.props.relayUserInput(timerSet);
	},
	componentDidMount: function() {
		this.checkAuth()
	},	
	checkAuth: function(){
		if (!this.props.auth){
			return 'register to make changes'
		} else {
			return ''
		}
	},	
	render: function() {
		return (
			<div className="sprklr"> 
		   	<h1>Cascada </h1>
		   	{this.props.user}
		   	<p style={{color:'red', fontSize: 18, textShadow: '1px 1px white'}}>{this.checkAuth()}</p>
		   	{/* 			*/}

 				<Pond onUserInput={this.comingUserInput} spot={this.props.spots.pond} auth={this.props.auth}/>
 				<Spot onUserInput={this.comingUserInput} spot={this.props.spots.bridge} auth={this.props.auth}/>
				<Spot onUserInput={this.comingUserInput} spot={this.props.spots.center} auth={this.props.auth}/>
			</div>
		);
	}
});

module.exports = Spots;