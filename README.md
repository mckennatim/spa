# 
https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56

https://medium.com/@joomiguelcunha/react-performance-tips-5fa199a450b2

https://blog.risingstack.com/introducing-react-easy-state/?utm_campaign=React%2BNewsletter&utm_medium=email&utm_source=React_Newsletter_104

https://cloudinary.com/console/welcome
## tags
https://gridbyexample.com/examples/example13/
https://www.mozilla.org/en-US/firefox/60.0a2/whatsnew/#cssgrid
https://mozilladevelopers.github.io/playground/css-grid/

### 45-hvac-v8e-refactor-componentDidMount
Took a look at [qstate object](test/app-objects/qstate.json) and fon how it interacts with setState. Refactored `SensorRelay` to use `interface/reset`'s functions to change state

### 44-hvac-v8d-hold-worksnow-fullstack
### 44-hvac-v8c-hold
Boosts and holds. 

There are 2 types of boosts, a 'cmd' boost where you just replace the temps for the currently running schedule event, changing its '/srstate' darr. The other kind of boost crosses schedule event boundaries or lasts for less time than the current schedule event calls for. this is a '/prg' boost and it changes the devicees sensor '/sched' for that day, rewriting the schedule.

Holds operate over more than the current day and require two steps. The first step rewrites the days schedule addng a hold at a certain temperature for the rest of that day. The second step causes an interaction with the sched database so that when the device picks up the next days schedules at midnight, it defers to any holds in place for that devices senrels. 
### 43-hvac-v8b-boost-modifySched
### 42-hvac-v8a-streq-createSchedObj
https://jsperf.com/lo-dash-vs-underscore-vs-json-stringify-isequal/2
TODO SaveSched maybe something to publish something
### 41-hvac-v7h-refactored2-setupMqttStore-hookupMqtt
### 40-hvac-v7g-mqtt$next-pubsub-funcs
TODO Every time a component mounts, if atLoc hasn't already happened, then the component has to create mqttStore(so it can subscribe to it)and createSubscriptions and createStartupPubreqs so qOnMount, qOnFocus or  qOnPageSwitch can connect, end or req the mqtt service. It need reformulating.
### 39-hvac-v7f-redo-refresh-logic
### 38-hvac-v7e-sr-schedUpdateQdata
TODO force update on back and forward into ZonesHOC goahead
<s>TODO xfrmSrstate</s> instead srUpdateQdata and schedUpdateQdata
### 37-hvac-v7d-interface-q-maybe
maybeConnect is called from components that need mqtt feed. It combines the original app store infocus listener with the ready state of mqtt$ to connect or not to mqtt. the mqttStore is activated in AtLoc for the particular loc and its devs and zones.
### 36-hvac-v7c-services-todo-2nd-store
mqttConnect starts up mqtt and subscribes to things it publishes. The trick is to create some kind of render props that modifies state for components that need fresh mqtt data. It will create a store

    const action$ = new Subject();
    const createStore = (initState) =>
      action$
        .flatMap((action) => isObservable(action) ? action : Observable.from([action]))
        .startWith(initState)
        .scan(mqttReducer);

then 

    const mqttStore= createStore(initState)

somehow then

    props
    mqttStore.subscribe((mqtt)=>{
      chunk a piece of mqtt
      return (
          <MyComponent {...props},{...mqtt}/>
        )
    })

or 

    const addMqttStore =(mqttStore, props, mqttPiece, Component)=>{
      mqttStore.subscribe((mqtt)=>{
        somemqtt = mqttPiece(mqtt)
        state = mqtt+props
        const QComponent = Component(state)
      }
      return QComponent
    } 
    return(
        <div className="header item-default">
          {addMqttStore(mqttStore, props, mqttPiece, Component)}
        </div>




### 35-hvac-v7b-services-worksalittle
about to move all the functions inside fromNqtt to inside `Observable.create ((obs)=>`
### 34-hvac-v7a-services-mqtt-actions
### 33-hvac-v7
### patterns
from: https://medium.freecodecamp.org/evolving-patterns-in-react-116140e5fe8f by Alex Moldovan

HOC - withAuthentication -pulls isAuthenticated out of state and then adds a redirect

    function withAuthentication(WrappedComponent) {
      const ModifiedComponent = (props) => {
        if (!props.isAuthenticated) {
          return <Redirect to="/login" />;
        }
        return (<WrappedComponent { ...props } />);
      };
      const mapStateToProps = (state) => ({
        isAuthenticated: state.session.isAuthenticated
      });
      return connect(mapStateToProps)(ModifiedComponent);
    }

HOC - using JSX

    const withProps = ( newProps ) => ( WrappedComponent ) => {
      const ModifiedComponent = ( ownProps ) => ( 
        <WrappedComponent { ...ownProps } { ...newProps } /> 
      );
      return ModifiedComponent;
    };
    const Details = ( { name, title, language } ) => (
      <div>
        <h1>{ title }</h1>
        <p>{ name } works with { language }</p>
      </div>
    );
    const newProps = { name: "Alex" }; // this is added by the hoc
    const ModifiedDetails = withProps( newProps )( Details ); 
    // above is curried for readability
    const App = () => (
      <ModifiedDetails 
        title="I'm here to stay"
        language="JavaScript"
      />
    );

props destructuring - com doesn't need but children do

    const Details = ( { name, language } ) => (
      <div>
        <p>{ name } works with { language }</p>
      </div>
    );
    const Layout = ( { title, ...props } ) => (
      <div>
        <h1>{ title }</h1>
        <Details { ...props } />
      </div>
    );
    const App = () => (
      <Layout 
        title="I'm here to stay"
        language="JavaScript"
        name="Alex"
      />
    );

conditional render

    const condition = true;
    const App = () => (
      <div>
        <h1>This is always visible</h1>
        {condition && (
            <div>
              <h2>Show me</h2>
              <p>Description</p>
            </div>
          )
        }
      </div>
    );

fetch - promise version

    componentDidMount() {
      this.setState({ content: this.props.loading() })
      fetch(this.props.url)
        .then(res => res.json())
        .then(
          res => this.setState({ content: this.props.done(res) }),
          res => this.setState({ content: this.props.error() })
        )
    }

fetch - await version

    componentDidMount() {
        this.setState({ content: this.props.loading() })
        try {
            const res = await fetch(this.props.url);
            this.setState({ content: this.props.done(res.json()) });
        } catch (err) {
            this.setState({ content: this.props.error() });
        }
    }

fetch - App turns over rendering to Fetch. Each Fetch prop is a (render) function. As state changes so does which function is returned in fetch's render function.

    import React from 'react';
    import { render } from 'react-dom';
    class Fetch extends React.Component {
      constructor() {
        super();
        this.state = {
          content: ""
        }
      }
      componentDidMount() {
          this.setState({ content: this.props.loading() })
          try {
              const res = await fetch(this.props.url);
              this.setState({ content: this.props.done(res.json()) });
          } catch (err) {
              this.setState({ content: this.props.error() });
          }
      }
      render() {
        return this.state.content;
      }
    }
    const App = () => (
      <Fetch
        url="https://www.booknomads.com/api/v0/isbn/9789029538237"
        loading={() => (
          <div>Loading ... </div>
        )}
        done={(book) => (
          <div>You asked for: { book.Authors[0].Name } - {book.Title}</div>
        )}
        error={() => (
          <div>Error fetching content</div>
        )}
      />
    );
    render(<App />, document.getElementById('root'));


render props - here ceding control to child

    class ScrollPosition extends React.Component {
      constructor( ) {
        super( );
        this.state = { position: 0 };
        this.updatePosition = this.updatePosition.bind(this);
      }
      componentDidMount( ) {
        window.addEventListener( "scroll", this.updatePosition );
      }
      updatePosition( ) {
        this.setState( { position: window.pageYOffset } )
      }
      render( ) {
        return this.props.children( this.state.position )
      }
    }
    const App = () => (
      <div>
        <ScrollPosition>
          { ( position ) => (
            <div>
              <h1>Hello World</h1>
              <p>You are at { position }</p>
            </div>
          ) }
        </ScrollPosition>
      </div>
    );

Working toward rxasred for the mqtt part. SensorRelay will connect, subscribe and will listen for a piece of the state. Now working on moving from devs&zones to devid,sr,id,name,img
### 32-base.context-renderprops
share props with all the children.
https://libraries.io/npm/react-dom/16.3.0-alpha.1
https://medium.com/dailyjs/reacts-%EF%B8%8F-new-context-api-70c9fe01596b
https://medium.com/@baphemot/whats-new-in-react-16-3-d2c9b7b6193b
https://dev.to/wxyyxc1992/frontend-weekly-no5-react-context-api--patterns-evolution-web-optimize-with-webpack-page-generation-by-ai-39ac
https://dev.to/sammyisa/explain-the-new-react-contect-api-like-im-five-1aho
https://www.google.com/search?q=using+react+context&client=firefox-b-1-ab&source=lnt&tbs=qdr:m&sa=X&ved=0ahUKEwjhqv7Y6aHZAhUKwFkKHTAYDC4QpwUIIQ&biw=1057&bih=927
https://github.com/jamiebuilds/unstated
https://github.com/reactjs/rfcs/blob/master/text/0002-new-version-of-context.md

see renderprops/README.md
### 31
#### adjusting range input


### 30-hvac-v6p-mqttFor-componentWillUpdate
TODO when moving back from 12ParleyVale/peri we need to reconstitute zdat.
### 29-hvac-v6o-SenRel
If you click on a zone in zones it adds an `sr` parameter to locs params. After Loc succesfully loads zone and device data, it checks to see if there is an `sr`. If so it only sends Zones that one zone. If Zones sees only one zone it diplays SenRel. Meanwhile data keeps flowing from mqtt.
param

### 28-hvac-v6n-zone
zone as li component
### 27-hvac-v6m-mqttFor-infocus-mounted-connected
infocus set from window.onfocus.onblur. mqttFor is initialized !connected and !mounted, mounted is toggled by the mount lifestyles and connected is toggled in onConnect() and onConnectionLost 
// console.log(JSON.stringify(zones, null, '\t'))
infocus
### 26-hvac-v6l-mqttFor-zones-fix
Instead of trying to tag on to zone fields (from the database), now zdat just copies the id of each zone and becomes a template for the mqtt message data.
### 25-hvac-v6k-mqttFor-zones
https://github.com/thejameskyle/unstated
got temps on screen, on returning doesnt update values
TODO fix Loc.js:53  `if(infocus){` to something like `if(infocus && inviewport){`
### 24-base-vb-va+reg
Added back `Registered` as a place for soauth to return to and store the email and token in ls. Remember token encodes the appid.
### 23-base-va-rxrt
Back to the basics in search or onfocus onvisible controll of mqtt connection. This base has no mqtt just rxred state store [rxasred review](# review-of-rxasred) and navigo routing. 

`About` uses `Observable.ajax(url)` to change the store by the `loadGithubFollowers` action which progressively changes the test state with GITHUB_FOLLOWERS_LOADING then GITHUB_FOLLOWERS_LOADED



### 22-hvac-v6j-eslint
### 22-hvac-v6i-loc-rx-focus
infocus gets set by setFocus action from window.onfocus,onblur. Every change in incoming state(props) causes a rerender. All the logic is in render. componenDid Mount doesn't react to focus so that would leave mqtt running. maybeLoad checks the props to see whats up in `{status, data, message}` which gets set by the fetchFor wrapper. If successful, `data` contains the array of devices that this app needs at this location. 
### 21-hvac-v6h-loc-paho
makeMqtt now takes the callbacks as parameters.
### 20-aajswp-shroom-paho3-util-test
Now utilities are a bit cleaned up. First write utilities and have them console.log to the browser running a test at the bottom of the page. Then put it in test once it works
### 19-aajswp-shroom-paho2-as-factory
Rewrote with paho.js which takes some cfg stuff and then when called from app.js as as `const mq = makeMqtt(cfg.devices)` it connects. app.js expors a callback function that gets called on every message 

    function onMessageArrived(message){
      aMessageCB(message)
    }  
## 18-esslint-aajswp-shroom
Errors suck so started using eslint. Spent a day on an an undefined variable causing `Connection Lost AMQJS0005E Internal error. Error Message: message is not defined, Stack trace: ...` and thinking somehow mqtt was broken when it wasn't.
https://github.com/standard/eslint-config-standard/blob/master/eslintrc.json
eslintrc.json is in /spa. Rewuired elslint and eslint-loader for webpack. Last loader executes first so 

    module: {
      rules: [
        { test: /\.js$/, 
          exclude: /node_modules/,
          use: [
            "babel-loader",
            "eslint-loader"
          ]
        },
        { test: /\.html$/, use:[{loader: "html-loader" }]}
      ]
    },


### 17-aajswp-shroom
What does a simple poj program look like if using import instead of `<script src="./sdf"` ? 
#### browser vs webpack vis a vis paho
- The browser is not fussy on declaration of variable, but webpack most certainly is. DO check that all variables are declared when using paho
- errores like `Connection Lost AMQJS0005E Internal error. Error Message: message is not defined, Stack trace: ...` are not about Paho, they are likely about crappy javascript code.
### 16-hvac-v6g-loc-as-class
frog
#### changing a functional component to a class
In prepartion for adding mqtt as state in the loc component, first change it from a function to a component. Compare loc in 6f and 6g. You will see that

    function Loc(props){
      return(h1)
    }

becomes

    class Loc extends React.Componnent{
      constructor(props) {
        super(props);
      }
      render(){
        return(h1)
      }      
    }

and all the rest of the functional component goes in the render function

      render(){
        const { name } = this.props.test;
        const {params} =this.props.responsive.page
        const {status, data, message} = this.props
        const listItems= data.map((item, i)=>{
          let hash = '#at/'+item
          return(
            <li key={i}><a href={hash} data-navigo>{item}</a></li>
          )
        })
        return(h1)

### 15-hvac-v6e-fetchFor-w-errorhandling
Using HOC's as a way to change state asynchronously in `LocList`. `fetchFor`...

note: prior versions using fetchFor are now broken as they call `api/dedata/localist/:appid/:usreid` instead of the preferred `api/dedata/localist/`. this is because the token already has the appid and the email encoded within it.

* takes `fetchFor(Component, fconfig)` where fconfig has a base `url` and `options`
* when it mounts, grabs a fresh copy of the token and email from ls and combines it with url and options.
* adds an object with `{status: 'waiting, error, success', data: data, message:, message}` to the state, which is linked to the props of the `Component`.
* `error` messages are `server failure` or `not-authorized`.
* `success` messages are `no-records`, `just-1` or `multi`
* returns a class component.
* should be reusable as a wrapper on other components awaiting server data

### 14-qd-rt-in-app-w-hoc

* Since HOC's need to return an element in order to get turned into returned JSX, there needs to be an `mapClass2Element` HOC around HOC's like `HocSetTimeout` that update a component on an async change. It is like this...

      function mapClass2Element(anElement){
        //returns a function called later with store as its arg and anElement from here
        return (state)=>{
          const props= state
          return React.createElement(anElement, props)
        }
      }
      HOC = mapClass2Element(HocSetTimeout(HOC))
* /src/util/isa.js has a bunch of functions to test for `isClassComponent, isFunction, isFunctionComponent, isReactComponent, isElement, isDOMTypeElement, isCompositeTypeElement`
*   "description": "quick and dirty frame with navigo in app.js and a HOC in dog with async timout then map to page"
* class constructor and componentDidMount only fire on the first render of App
* Navigo picks up the hash on refresh

https://stackoverflow.com/questions/33199959/how-to-detect-a-react-component-vs-a-react-element
### 13-qd-HOC

qd = quick and dirty, a test of functional HOC
### 12-hvac-v5-loclist2hoc
https://reactjs.org/docs/higher-order-components.html

https://medium.com/@svensauleau/render-async-stateless-functional-components-in-react-11a888ceb828

https://github.com/esphen/fetch-hoc/blob/master/src/index.js


navigate only works (like in Home) if the element is rendered and you use a button
rationalize cfg and get it constructed in app.js----. use location. instead
### 11-hvac-v5
v5a is working copy
### 10-hvac-v4-paring-down
[initial navigation](#initial-navigation)
### 09-hvac-b2-code-splitting
delay loading history from utilities/loc until componentDidMout  of App

https://stackoverflow.com/questions/33199959/how-to-detect-a-react-component-vs-a-react-element



WTF rr4 makes you jump trough hoops to nowhere to programmatically navigate to a new route.

whatif any principle or subroutes are controlled by an observable?

ie history is  

### 08-spa-cra-rr4
Using create-react-app and react-router-dom 4.
https://medium.com/@mckenna.tim/using-npm-on-an-old-computer-2fd3a79d16cf
#### Using npm on an old computer

 `npm` installs created when you use `cli's` like `create-react-app` are on the order of hundreds of megabytes. On my 7 year old Windows 7 HP Pavilion (Git bash) it can take 5 minutes install `hello world` and just as long to delete. That's the only thing that bothers me for software development. Tests run fine; transpiling is reasonable. Otherwise, I see little other reason to upgrade to another machine. But I have found a work around.

  My style of learning is to build many quick and dirty apps to try out things. Running `create-react-app` for each one ain't happening. `package.json` will look for `node_modules` all the way up the directory tree so creating a parent directory to hold shared `node_modules` works great. Here is a directory tree...

     cra
      blank
      biggerapp
      hello-world
      hello-react-router
      killer-app
        v1
        v2
        v17
      node_modules

First run something like `create-reat-app blank` from `cra` then move the `node_modules` out of `cra/blank` and into `cra`. `create-react-app` relies on `react-scripts` for start, build test and eject but now it won't find them. Open  `package.json` for `blank` and change

    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test --env=jsdom",
      "eject": "react-scripts eject"
    }
to

    "scripts": {
      "start": "set PORT=3003 && node ../node_modules/react-scripts/bin/react-scripts.js start",
      "build": "node ../node_modules/react-scripts/bin/react-scripts.js build",
      "test": "node ../node_modules/react-scripts/bin/react-scripts test --env=jsdom",
      "eject": "node ../node_modules/react-scripts/bin/react-scripts eject"
    }

On a mac I would guess it would be something like

    "start": "PORT=3003 ../node_modules/react-scripts/bin/react-scripts.js start"

Then each time you want to spin up another app just create a duplicate the `blank` directory, change the port in `package.json` and (npm) start it right up. Some variation of this technique works for any big stack, if something can't be found automatically just add the `../../node_modules/...path` to the binary it can't find. Later when you want to run off a more updated stack, create another master directory and a
basic blank code skeleton, move back the `node_modules` and duplicate/modify/version quickly whenever you want.   

## deploying a react router 4 app to a subdirectory

`creat-react-app` is a good base for adding `react-router-dom 4`. And having your routes work without `#` just looks cooler. `BrowserRouter` works fine on the devserver. Here's what you have to do to get it to deploy and still work.

Say you want to deploy the app in the `rr4` subdirectory of the host `tryit.sitebuilt.net` . ie you type in `tryit.sitebuilt.net/rr4` to run it.

in `package.json` add this line... `"homepage": "http://tryit.sitebuilt.net/rr4"`. In the `src/index.js` file of the app add the prop `path='rr4'` to `ReactDOM.render(<App path='rr4'/>, document.getElementById('root'));` When in the devserver and it says `You can now view xxx in the browser.` add `rr4` to the url in the browser. On the server, copy everything from the build directory into `/home/tryit/public_html/rr4`
### 07-spa-hvac-v3
Things load because of import. So the entry point is app.js and the first thing loaded is showRWD. Routing is implemented with showRWD.js on its own and routing like admind.

### initial-navigation

What should wrap `home/locid`, `loclist` and `login` to authenticate user?

    If home
      if curloc, email and token in ls
        navto homw/:locid  
      else if no loc but email and token
        navto loclist
      else navto login    


    If home/:locid
      if devices email  and token in ls
        `connect to devices` with email and token
        if connect
          start getting data
        else navto login  
      else if no devices but curloc email and token
        `get devices for this user and app and loc store in ls`
        `connect to devices`

    if in LocList
      get locs for this user
      if only one
        navto home/:locid
      else make list  
      on click `get devices for this user and app and loc and store in ls`
        navto home/:locid

    if registered
      on callback
        store email and token in ls
        if ! locids `get locids for this user and appId`
        if locids==1
          `get devices for this user and app and loc and store in ls`
          navto home/:locid[0]
        else navto loclist  

What should ls look like?

currently...

    appid: {
      email:
      token
    }

should be...

    appid: {
      email:
      token:
      currentLoc: {
        locid:
        devices: [
          CYURD006,
          CYURD007
        ]
      }
      locs: []
    }

what queries need to get done?

select locids for user and app
select devices for locid and user and app


### 06-spa-hvac-v2-routing
basic routing without responsive
### 05-hvac-v1-homeOrlogin
A blank project with a few routes.

    <home-or-login app={appinfo} home={home} login={login}></home-or-login>

    appinfo={appId:, authUrl:, cbPath:, api: }

    spa
      admind
      rxasred
      hvac
        dist
        src
          components
            Home.js
            About.js
            Nav.js
      login
        HomeOrLogin.js

step1: create a dummy hvac with         

Updated navigo to 6.0.0 so the proper url shows up.
#### review of admind responsive routing

switchPage is an action of type 'PAGE_SWITCHED' that gets reduced and changes the state.responsive.page object. Here's what happens when you navigate to /registered.

      const routing = ()=>{
      	const cfg ={root: null, useHash: true}
      	router = new Navigo(cfg.root, cfg.useHash);
      	router
      	  .on({
            ...  
            'registered': (params, query)=>{
              switchPage({name: 'Registered', params: {query: query}});
            },...

rxasred/createStore creates a subject stream and app.js subscribes to it. When this store changes react rerenders the App component with the new state.     

    createStore(initState)
      .do(log)
      .subscribe((state) =>{
      	copyStore(state)
        return ReactDOM.render(<App {...state} />, container)
      });   

So whenever the state change, App.js's render function is called and its showPage() method is run which returns the utilities/wfuncs/responsivePage(this.props) function.

    showPage=()=>{
      return responsivePage(this.props)
    }
    render(){
      return(
        <div className="container">
          <div className="header item-default">
            {this.loadNav()}
          </div>
          {this.showPage().map((el,i)=>{
            return <div className="content item-default" key={i}>{el}</div>
          })}
        </div>
        )    

The state updates the responsive/browser string whenever the page is resized and from the browser type a lookup is done on how many panes should be displayed. That info combined with the page name filters multi to the appropriate  multi.mul array of page names to be displayed.

    const multi =[{pri:'About', mul:[
				['About', 'Products'],
				['Products', 'About', 'Home']]
			 }, ...

If that multiList isn't found for a state.responsive.page.name then the function/class of that page.name is put in an array.

compoi is the components components/index.js exports. along with `panes` and `multi` (used to set up reponsive panes). index.js exports and compoi also gets all the components. `compoi[pagename](state)` is a component.

If there is a multiList for that page and browsersize, elList maps through the component names and creates a new array of real components.

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

The render function of App.js maps through the component list creating a div for each one.

    {this.showPage().map((el,i)=>{
      return <div className="content item-default" key={i}>{el}</div>
    })}
### 03-egg
added directory with notes and references from egghead.io classes
### 02-rxrena-rsasredux
added ui/k3

#### on embedding a timer_ctrl

A heating system app would have one or more locations in a house. The main page would have basic data for the house (location, temp, setpt, ison, lastchange).

_The house could be comprised of 1 or more esp8266s, each with one or more sensors/relays (senrels)._

Clicking on a location, switched you to a page that allows you to boost or hold a location. Details might include the current day's schedule.

Clicking on todays schedule takes you to a __timer_ctrl__.

Clicking on schedule takes you to a table that lists the overall schedule: by day, everyday, weekend, weekday, for_date. From there, clicking on anything but for_date takes you to __timer_ctrl__. Schedule also has a copy_to button to copy schedule to other locations.

_to mock it <sb-timr-ctrl sched={sched} schedChanged={handleSchedChange}> gets placed in a page that has state and passes a schedule array as props. __timer_ctrl__ messes with that schedule until it gets it right and then schedChanged gets called with an sched object returned  _

__timr_ctrl__ takes an object like

    raw: [
        [0,0,59],
        [9,10,74],
        [9,40,62],
        [17,0,68],
        [22,30,58]
    ]

and transforms it to

    decans: {
        g1: [0.0, 9.13, 59],
        g2: [9.13, 9.66, 74],
        g3: [9.66, 17.00, 62],
        g4: [17.00, 22.33, 67],
        g5: [22.33, 0.0, 58]
    }

and then draws that. Modifying the cornerGrabs changes the associated object  

### 01-rxrena-admind-aapoj
moved up to react 16.1.1, rxjs 5.5, navigo5.3.3, paho.mqtt.js 2.0.5
got rid of createClass in Devinf.js so admind would run. brought over just the basic active stuff from spas

## review of rxasred
Ok so at the heart of things:

    action$.scan(reducer).subscribe(renderer)

    action$ is an observable stream.  

an actionCreator takes a payload and returns an object `{type:'SOMEACTION',payload:payload}`. Defining an action means giving it a name and a type. ActionCreator then throws this action on the action$ stream which takes the action and state and puts it through the reducer to create a new state. That state has been subscribed to so that the render function of react is called every time state changes

        const action$ = new Subject();

        const createStore = (initState) =>
          action$
            .flatMap((action) => isObservable(action) ? action : Observable.from([action]))
            .startWith(initState)
            .scan(rootReducer);

        const actionCreator = (func) => (...args) => {
          const action = func.call(null, ...args);
          action$.next(action);
          if (isObservable(action.payload))
            action$.next(action.payload);
          return action;
        };

    const changeName = actionCreator((payload) => ({
      type: 'NAME_CHANGED',
      payload
    }));

### apply, call and bind review
http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/
Bind () Allows us to Borrow Methods
the first argument of bind sets 'this'

    $("button").click (user.clickHandler.bind (user));

You need .bind(user) because otherwise it expects button to have a user.clickHandler method. .bind(user) says the function is actually here(in user)

Bind Allows Us to Curry a Function 
The remaining arguments of bind can be stepped over and selectively reset. Below, the first argument(after this) is "" is skipped over and the second argument is preset to 16.



    var greetAnAdultMale = greet.bind (null, "", 16);




We can create a function that presets one or more of the parameters of another function.


### common issues
- DO use .babelrc for all babel presets and stuff. Now mocha can access it
- DO use a `test/mocha.opts` with at least `--compilers js:../node_modules/babel-register` and do give the path to where the node_modules really are
- DO try new stuff in local node_moodules then move them here and fix what needs fixing
- DON'T run npm global stuff. To get to the binary for cli do something like `node ../node_modules/webpack/bin/webpack` to run the latest version
- DON'T assume you have loaded enough babel presets to actually use all es6 features. DO on error first look for a babel preset before you assume some other problem
#### browser vs webpack vis a vis paho
- The browser is not fussy on declaration of variable, but webpack most certainly is. DO check that all variables are declared when using paho
- errores like `Connection Lost AMQJS0005E Internal error. Error Message: message is not defined, Stack trace: ...` are not about Paho, they are likely about crappy javascript code.
