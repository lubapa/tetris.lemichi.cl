
import './index.css'

function Tetris() {
  const canvas:HTMLCanvasElement = document.querySelector('canvas') as HTMLCanvasElement;
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
      [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1]
    ]

  const piece = {
    position: { x:5, y:5 },
    shape: [
      [1,1],
      [1,1]
    ]
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
  function update():void{
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
        console.log(checkCollision())
        piece.position.y--;
        solidifyPiece();
        removeRows();
      }
    }
  })

  function checkCollision(){
    return piece.shape.find((row,y)=>{
      return row.find((value,x)=>{
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
    piece.position.x=0;
    piece.position.y=0;
  }
  function removeRows(){
    const rowsToRemove:number[] = [];

    board.forEach((row,y) => {
      if (row.every( value => value ===1)){
        rowsToRemove.push(y);
        console.log(rowsToRemove);
      }
    });
    rowsToRemove.forEach(y => {
      board.splice(y,1);
      const newRow:number[] = Array(BOARD_WIDTH).fill(0);
      board.unshift(newRow)
      console.log(board)
    });
  }

  update()

  return (
    <>
    </>
  )
}

export default Tetris
