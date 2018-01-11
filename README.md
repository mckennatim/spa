# spa

## tags

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

What should wrap `home/locid`, `loclist` and `login` to authenticate user?

    If home/locid
      if devices email  and token in ls
        `connect to devices` with email and getToken
        if connect
          start getting data
        else navto login  
      else if no devices but email and token
        `get devices for this user and app and loc store in ls`
        `connect to devices`

    if LocList
      on click `get devices for this user and app and loc and store in ls`
          navto home/locid

    if login
      onclick navto soauth
      on callback
        store email and token in ls
        `get locids for this user and appId`
        if locids==1
          `get devices for this user and app and loc and store in ls`
          navto home/locids
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
  locs: [
    locid:
    devices: [
      CYURD006,
      CYURD007
    ]
  ]
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
