
const Player =(symbol)=>{
    return {
      symbol
    }
}
const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
  
    const setField = (index, sign) => {
      if (index > board.length) return;
      board[index] = sign;
    };
  
    const getField = (index) => {
      if (index > board.length) return;
      return board[index];
    };
  
    const reset = () => {
      for (let i = 0; i < board.length; i++) {
        board[i] = "";
      }
    };
  
    return { setField, getField, reset };
  })();


