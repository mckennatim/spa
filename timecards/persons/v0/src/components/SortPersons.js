import React from 'react'// eslint-disable-line no-unused-vars
import {mapClass2Element} from '../hoc/mapClass2Element'
import {fetchPersons, postPersons} from '../services/fetches'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';// eslint-disable-line no-unused-vars

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  background: isDragging ? 'lightgreen' : 'grey',

  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 285,
});

class SortPersons extends React.Component{
  Persons='mabibi sufvhs'
  state={
    persons: [{job: 'duck', id: 99}],
    wk: 0,
    filt: 'all',
    unique: [{id:99, content:'dog'}]
  }

  dwk=null

  componentDidMount(){
    this.getPersons(0)
    this.dwk = document.getElementById("wk")
  }  
  getPersons(){
    fetchPersons(0)     
      .then((res)=>{
        var unique = [... new Set(res.persons.map((j) => j.job))]
          .map((aj,i)=>{
            return {id:i, job:aj}
          }); 
        this.setState({persons: res.persons, unique:unique},()=>{})
      })
  }

  onDragEnd=(result)=> {
    // dropped outside the list
    if (!result.destination) {return;}
    const unique = reorder(
      this.state.unique,
      result.source.index,
      result.destination.index
    );
    this.setState({unique},()=>{
      this.save2server()
    });
  }  

  save2server=()=>{
    const {unique, persons} =this.state
    const npersons = persons.map((ajob)=>{
      let idx = unique.findIndex((x) =>{
        return x.job==ajob.job
      })
      delete ajob.id
      delete ajob.coid
      return {...ajob, idx:idx}
    })
    postPersons(npersons, 0)
    //router.navigate('/persons');
    location.replace('#persons?rerender')
  }
  
  render(){
    if (this.state.unique){
      return(
        <div>
          <h4>Drag and Drop To Reorder</h4>
        <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.unique.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.job}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </div>
      )
    }else{
      return(
        <div>
          <a href="home" data-navigo>maybe you need to register</a>
        </div>
        )
    }
  }
}
SortPersons = mapClass2Element(SortPersons)

export {SortPersons}
