import React from 'react'// eslint-disable-line no-unused-vars
// import {Home} from './Home'
// import {HomeOrLogin} from '../../../login/HomeOrLogin.js'
// import {HomeOrLogin} from './HomeOrLogin.js'
// console.log(HomeOrLogin);

const imgarr = [
"http://tried-and-true.com/wp-content/uploads/2011/01/black-prince-tomato.jpg",
"https://upload.wikimedia.org/wikipedia/commons/b/b1/Brandywine.jpg",
"https://www.rareseeds.com/assets/1/14/DimRegular/Tomato-YELLOW-BRANDYWINE1.jpg",
"https://images-na.ssl-images-amazon.com/images/I/41bfdJSaLIL.jpg",
"https://www.southernexposure.com/images/large/tomato-cherokee-green_LRG.jpg",
"http://cdn3.volusion.com/ph9xz.o9ecs/v/vspfiles/photos/TF-0429-2.jpg?1434915134",
"https://i.pinimg.com/originals/0a/a6/c2/0aa6c27ba4738b016f778a33bb6ad0d6.jpg",
"https://i.pinimg.com/originals/84/cc/94/84cc942962c2758e8acc3aa2eceffb7c.jpg",
"https://njaes.rutgers.edu/tomato-varieties/images/Tomato_09_Valencia.jpg",
"https://cdn.shopify.com/s/files/1/0200/5036/products/1893957_150209081327_00951.jpeg?v=1423496120",
"https://cdn.mr-fothergills.co.uk/product-images/op/z/12734z.jpg"
]

const colarr =[
"black",
"red",
"yellow",
"purple",
"green",
"blue",
"white",
"#835C3B",
"orange",
"pink",
"grey"
]

const  descarr = [
"Mahogany brown with good flavor. Distinctive, rich, fruity tomato flavor. Relatively smooth, 3- to 5 ounce tomatoes. Indeterminate. Heirloom. Organically grown.",
"Luscious, heirloom flavor as 'very rich, loud, and distinctively spicy.' Produces tomatoes that can weigh about one pound. Indeterminate. Organically grown.",
"An orange version of Brandywine. This potato-leaved variety can be finicky to grow, with roughly-shaped fruit one year and smooth the next. Indeterminate. Organically grown. Heirloom. ",
"Medium-large, flattened globe, 8 to 12 ounce. fruits. Color is dusky pink with dark shoulders. Indeterminate. Organically grown. Heirloom.",
"Medium-sized, 8 ounce. green fruits. Acquire some yellowish-orange color on the blossom end when ripe. Indeterminate. Organically grown. Heirloom.",
"Deep pink and smoother than Brandywine, Every bit as meaty and flavorful. Fruits weigh 10 ounces. Indeterminate. Organically grown. ",
"Big yellow-white fruits with mild flavor. The 12 ounce fruit is meaty with few seeds, a mild non-acid flavor and creamy texture. Indeterminate. Organically grown. Heirloom.",
"Fruits are deep red and cold tolerant with a rich tomato flavor. 4 - 6 ounce fruits with a small stem scar. Indeterminate. Organically grown. Heirloom. ",
"Sunny orange fruits with full tomato flavor. Round, smooth fruits average 8 - 10 ounces. This mid-season tomato among the best for flavor and texture. Indeterminate. Organically grown. Heirloom.",
"The flat, medium to large, variably ribbed-shoulder tomatoes are shaded yellow and red. 12 ounce fruits. Indeterminate. Organically grown. Heirloom.",
"(Small Standard) Determinate variety that has an unusual quality. Can set fruit under cool conditions. Produces many clusters of small 5cm (2in) fruits that ripen early. Plenty of flavourful, red fruits. "
]

const  namearr = [
"Black Prince",
"Brandywine",
"Yellow Brandywine ",
"Cherokee Purple",
"Cherokee Green",
"Rose",
"Great White",
"Moskvich",
"Valencia",
"Striped German",
"Subartic Plenty"
]

let name=''
let csel=[0,0,0,0,0,0,0,0,0,0,0]

let burl='https://services.sitebuilt.net/iotex/api/tom'
// let burl='http://localhost:3332/api/tom/'

class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      ...props, selected:[0,0,0,0,0,0,0,0,0,0,0], name:'', anyleft: [1,1,1,1,1,1,1,1,1,1,1]
    };
  }
  componentDidMount= ()=>{
    this.getAmts()
  }

  getAmts=()=>{
    let url= burl+'/amts'
    let options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: "GET"
    }
    fetch(url, options)
    .then((response)=>response.json())
    .then((json)=>{
      if(json.message){
        this.setState({qmessage: json.message})
      }else{
        console.log(json)
        let anyleft= json.map((j)=>{
          return j>0*1
        })
        this.setState({anyleft:anyleft})
      }
    })   
  }

  toggleCheckbox = (i) => {
    //let csel = this.state.selected
    // console.log(csel)
    csel[i] = !csel[i]*1
    // console.log(csel)
    // console.log(i)
  }

  changeName = (e)=>{
    console.log(e.target)
    e.preventDefault()
    this.setState({name:e.target.value})
    e.preventDefault()
  }

submit=(e)=>{
  console.log(csel)
  let ids= []
  csel.map((d,i)=>{
    if (d==1){
      ids.push({id:i+1})
    }
  })
  console.log(ids)
  let data = {name:this.state.name, selected:JSON.stringify(csel)}
  console.log(data)
  let strdata = JSON.stringify(data)
  let url= burl+'/pst'
  let options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: "POST",
    body: strdata
  }
  fetch(url, options)
  .then(()=>{
    this.getAmts()
  })  
}

  render(){
    console.log(colarr[2])
    const{anyleft}= this.state
    return(
      <div className="container">
        <div className="header item-default">

        <h4>Heirloom Seedlings 2018</h4>
        <p>Short description by color code</p>
        </div>
        <div className="content item-default" >

        <ul>
        {colarr.map((c,i)=>{
          return (
            <li key={i}>
            {anyleft[i] ? (<span></span>) : (<span>NO HAY </span>)}
            <svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" version="1.1">
               <circle cx="20" cy="20" r="20" stroke="#333" strokeWidth="1" fill={c}/>
            </svg>             
            <span>{namearr[i]} </span>
            <span>
            <img src={imgarr[i]} alt="" height="100px"/>
            <p>{descarr[i]}</p> 
            </span>
            </li>
            )
    
        })}
        </ul>
        </div>
      </div>
      )
  }
}
export{App}

