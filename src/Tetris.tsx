import './index.css'
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight, FaRegArrowAltCircleUp } from 'react-icons/fa';
import React from 'react';



function Tetris() {
  const canvas:HTMLCanvasElement = document.getElementById('tetriscanvas') as HTMLCanvasElement;
  const context:CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

  
  const BLOCK_SIZE    = 20; // 20 px
  const BOARD_WIDTH   = 14; // 14 bloques
  const BOARD_HEIGTH  = 30; // 30 bloques 

  canvas.width  = BLOCK_SIZE * BOARD_WIDTH;
  canvas.height =  BLOCK_SIZE * BOARD_HEIGTH;

  context.scale(BLOCK_SIZE, BLOCK_SIZE)
  // 1. Board
    const board= [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  //Pieces
  const PIECES =[
    [
    [1, 1],
    [1, 1]
    ],
    [
      [1, 1, 1, 1]
    ],
    [
      [0, 1 ,0 ],
      [1, 1, 1,]
    ],
    [
      [1, 1, 1],
      [1, 0, 0]
    ],
    [
      [1,1,0],
      [0,1,1]
    ],
    [
      [0,1,1],
      [1,1,0]
    ]
]
    
  const piece = {
    position: { x:Math.floor(Math.random()*BOARD_WIDTH/2+2), y:5 },
    shape: PIECES[Math.floor(Math.random()*PIECES.length)]
  }


  // 2. Game loop
  function draw(){
    context.fillStyle = '#000'
    context.fillRect(0,0,canvas.width,canvas.height)
    board.forEach((row,y) =>{
      row.forEach((value,x)=>{
        if (value===1){
          context.fillStyle = 'yellow';
          context.fillRect(x,y,1,1);
        }
      })
    })

    piece.shape.forEach((row,y)=>{
      row.forEach((value,x)=>{
        if (value){
          context.fillStyle = 'red';
          context.fillRect(x+piece.position.x,y+piece.position.y,1,1);
        }
      })
    })
  }

  let deltaTime:number = 0;
  let previoustime:number ;
  function update(time=0):void{
    if (isNaN(deltaTime)){
      deltaTime=0;
    }
    const elapsedtime = time - previoustime;
    previoustime = time;
    deltaTime +=elapsedtime;

    if (deltaTime >= 500){
      piece.position.y++
      deltaTime=0;
      if(checkCollision()){
       piece.position.y--;
       solidifyPiece();
       removeRows(); 
      }
    }

    draw();
    window.requestAnimationFrame(update)
  }

  document.addEventListener('keydown', event => {
    if(event.key==='ArrowLeft'){
      piece.position.x--;
      if (checkCollision()){
        piece.position.x++;
      }
    }
    if(event.key==='ArrowRight'){
      piece.position.x++;
      if(checkCollision()){
        piece.position.x--;
      }
    }
    if(event.key==='ArrowDown'){
      piece.position.y++;
      if(checkCollision()){
        piece.position.y--;
        solidifyPiece();
        removeRows();
      }
    }
    if(event.key==='ArrowUp'){
      rotar();   
    }
  })
  // Check collision
  function checkCollision(){
    return piece.shape.find((row,y)=>{
      return row.find((value,x)=>{
        //PORQUE DA GAMEOVER SIN RAZON APARENTE??
        // console.log(value, board[y+piece.position.y]?.[x+piece.position.x],y+piece.position.y,x+piece.position.x,board) 
          return(
            value!==0 && board[y+piece.position.y]?.[x+piece.position.x]!==0
          )
      })
    })
  }
  function solidifyPiece(){
    piece.shape.forEach((row,y)=>{
      row.forEach((value,x)=>{
        if (value ===1){
          board[y+piece.position.y][x+piece.position.x]= 1;
        }
      })
    })
    //reset position
    piece.position.x=Math.floor((Math.random()*BOARD_WIDTH/2+1));
    piece.position.y=0;
    //random shape
    piece.shape = PIECES[Math.floor(Math.random()*PIECES.length)]

    // GAME OVER

    if (checkCollision()){
      // console.log("Tablero GAMEOVER", board)
      window.alert('GAME OVER' );
      board.forEach((row) => row.fill(0));
    }
  }
  function removeRows(){
    const rowsToRemove:number[] = [];

    board.forEach((row,y) => {
      if (row.every( value => value ===1)){
        rowsToRemove.push(y);
      }
    });
    rowsToRemove.forEach(y => {
      board.splice(y,1);
      const newRow:number[] = Array(BOARD_WIDTH).fill(0);
      board.unshift(newRow)
    });
  }

  const keysTouchMove = (id:string,e: React.TouchEvent<HTMLButtonElement>)=>{
    switch (id) {
      case 'left-button':
        piece.position.x--;
        if (checkCollision()){
          piece.position.x++;
        }
        break;
      case 'up-button':
        rotar();  
        break;
      case 'down-button':
        piece.position.y++;
        if (checkCollision()){
          piece.position.y--;
          solidifyPiece();
          removeRows();
        }
        break;
      case 'right-button':  
        piece.position.x++;
        if (checkCollision()){
          piece.position.x--;
        }
        break;
    
      default:
        break;
    }
    timer= setTimeout(() =>  keysTouchMove(id,e),touchduration-20);
  }

  // Rotacion de piezas
  function rotar(){
    let newshape:number[][]=[];
    let oldshape:number[][]=piece.shape;
    let newrow:number[]= [];
    for(let i=0;i<piece.shape[0].length;i++){
      newrow=[];
      for(let j=(piece.shape.length-1); j>=0;j--){
         newrow.push(piece.shape[j][i]);
      }
      newshape.push(newrow);
     }
     piece.shape=newshape
     if(checkCollision()){
        piece.shape=oldshape;
     }
     newshape=[];
     oldshape=[];
     newrow=[];
  }

  let timer: ReturnType<typeof setTimeout>
  const touchduration = 70; //  function starttimertouch(){
  const starttimertouch = (e: React.TouchEvent<HTMLButtonElement>) => {

    const id = e.currentTarget.id;
    timer = setTimeout(() =>  keysTouchMove(id,e),touchduration);
  }  

  const endtimertouch = ()=>{
    clearTimeout(timer);
  }

  update()

  return (
    <>
    <div>
      <div className='buttons-div'>
      <button id={'left-button'} onTouchStart={starttimertouch} onTouchEnd={endtimertouch}><FaRegArrowAltCircleLeft size={50}/></button>
      <button id={'up-button'} onTouchStart={starttimertouch} onTouchEnd={endtimertouch}><FaRegArrowAltCircleUp size={50}/></button>
      <button id={'down-button'} onTouchStart={starttimertouch} onTouchEnd={endtimertouch}><FaRegArrowAltCircleDown size={50}/></button>
      <button id={'right-button'} onTouchStart={starttimertouch} onTouchEnd={endtimertouch}><FaRegArrowAltCircleRight size={50} /></button>
      </div>
    </div>

    </>
  )
}

export default Tetris
