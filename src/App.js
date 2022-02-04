import './App.css';
import React, {useState, useEffect} from 'react';
import Snake from './component/Snake/Snake'
import Food from './component/Food/Food'

let touch = 'RIGHT'
let SCORE = 0 

function App(){
  const [position , setPosition] = useState([
    //top, left
    [0, 0],
    [0, 2],
    [0, 4]
  ])

  const generateFoodPostion = () => {
    const MIN = 2
    const MAX = 96

    let y = Math.floor((Math.random()*(MAX-MIN+1)+MIN)/2)*2 //top
    let x = Math.floor((Math.random()*(MAX-MIN+1)+MIN)/2)*2 //left

    return [y, x]
  }

  function refreshPage() {
    window.location.reload(false);
  }

  const [foodPosition, setFoodPosition] = useState(generateFoodPostion())

  const [statut, setStatut] = useState(true)

  useEffect(()=>{
      setTimeout(() => {
        if(touch==='RIGHT'){

          if(position[position.length-1][0]===foodPosition[0] && position[position.length-1][1]===foodPosition[1]){
            setPosition((prevPosition)=>{
              return [...prevPosition, [position[position.length-1][0],position[position.length-1][1]+2]]
            })
            setFoodPosition(generateFoodPostion())
            SCORE+=10
          }else{
            if(position[position.length-1][1] >= 98){
              setStatut(false)
              return
            }
        
            position.shift();
            setPosition((prevPosition)=>{
              return [...prevPosition, [position[position.length-1][0],position[position.length-1][1]+2]]
            })
          }
        }

        if(touch==='LEFT'){
          if(position[position.length-1][0]===foodPosition[0] && position[position.length-1][1]===foodPosition[1]){
            setPosition((prevPosition)=>{
              return [...prevPosition, [position[position.length-1][0],position[position.length-1][1]+2]]
            })
            setFoodPosition(generateFoodPostion())
            SCORE+=10
          }else{
            if(position[position.length-1][1] <= 0){
              setStatut(false)
              return
            }
  
            position.shift();
            setPosition((prevPosition)=>{
              return [...prevPosition, [position[position.length-1][0],position[position.length-1][1]-2]]
            })
          }
        }

        if(touch==='DOWN'){
          if(position[position.length-1][0]===foodPosition[0] && position[position.length-1][1]===foodPosition[1]){
            setPosition((prevPosition)=>{
              return [...prevPosition, [position[position.length-1][0]+2,position[position.length-1][1]]]
            })
            setFoodPosition(generateFoodPostion())
            SCORE+=10
          }else{
            if(position[position.length-1][0] >= 98){
              setStatut(false)
              return
            }
  
            position.shift();
            setPosition((prevPosition)=>{
               return [...prevPosition, [position[position.length-1][0]+2,position[position.length-1][1]]]
             })  
          }
        }

        if(touch==='UP'){
          if(position[position.length-1][0]===foodPosition[0] && position[position.length-1][1]===foodPosition[1]){
            setPosition((prevPosition)=>{
              return [...prevPosition, [position[position.length-1][0]+2,position[position.length-1][1]]]
            })
            setFoodPosition(generateFoodPostion())
            SCORE+=10
          }else{
            if(position[position.length-1][0] <= 0){
              setStatut(false)
              return
            }

          position.shift();
          setPosition((prevPosition)=>{
             return [...prevPosition, [position[position.length-1][0]-2,position[position.length-1][1]]]
           })
          }
        }
      },90)
  },[position])
 

  function ArrowDown(){
    if(touch !== 'UP')
      touch = 'DOWN'
  }

  const ArrowUp = ()=>{
    if(touch !== 'DOWN')
      touch = 'UP'
  }

  const ArrowLeft = ()=>{
    if(touch !== 'RIGHT')
      touch = 'LEFT'
  }

  const ArrowRight = ()=>{
    if(touch !== 'LEFT')
      touch = 'RIGHT'
  }
  

    const logKey= (e)=> {
      if(e.code === 'ArrowDown'){
       ArrowDown()
      }

      if(e.code === 'ArrowUp'){
        ArrowUp()
      }

      if(e.code === 'ArrowLeft'){
        ArrowLeft()
      }

      if(e.code === 'ArrowRight'){
        ArrowRight()
      }
      
    }

    document.addEventListener('keydown', logKey);

      return (
        <div className="app">
          {statut? <h1>Score: {SCORE}</h1> : 
          <div style={{textAlign:'center'}}>
              <h1 style={{color:'red'}}>Perdu</h1>
              <h3 style={{color:'red'}}>score:{SCORE}</h3>
          </div> 
          }
          <div className="area">
            <Snake position={position} />
            <Food foodPosition={foodPosition} />
          </div>
          {!statut && <input style={{margin: '10px',padding: '10px',borderRadius: '15px'}} type={'button'} value={'Ressayez'} onClick={()=>refreshPage()}/>}
        </div>
      );
  }

export default App;
