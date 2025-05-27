import { useState } from 'react'
import './App.css'

const cinemaLayout = Array(7).fill().map(() => [
  'W', 'W',
  ...Array(5).fill("A"),
  'W', 'W',
  ...Array(5).fill("A"),
])

function App() {
  const [matrix, setMatrix] = useState(JSON.parse(localStorage.getItem("matrix")) || cinemaLayout);

    const handleSeatClick = (rowIdx, colIdx) => {
      const newMatrix = matrix.map((row, rIdx) =>
        row.map((seat, cIdx) => {
          if (rIdx === rowIdx && cIdx === colIdx) {
            if (seat === "A") return "S";
            if (seat === "S") return "A";
          }
          return seat;
        })
      );
      setMatrix(newMatrix);
    };

    const clearSelection = () => {
      const newMatrix = matrix.map(row => row.map(seat => seat === "S" ? "A" : seat));
      setMatrix(newMatrix);
    };

    const bookSeats = () => {
      const newMatrix = matrix.map(row => row.map(seat => seat === "S" ? "B" : seat));
      localStorage.setItem("matrix", JSON.stringify(newMatrix));
      setMatrix(newMatrix);
    };    

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
    <h2>Book Tickets</h2>
    <div className="seat-container">
    {matrix.map((row, rowIdx) => (
      <div key={rowIdx} className="seat-row">
        <div className="row-label">{String.fromCharCode(65 + rowIdx)}</div>
        {row.map((seat, colIdx) => (
          <div key={colIdx} 
          className={`seat ${seat === "W" ? "walkway" : seat === "A" ? 
            "available" : seat === "S" ? "selected" : "booked"}`}
            onClick={() =>
              seat !== "W" && seat !== "B" ? handleSeatClick(rowIdx, colIdx) : null
            }
          >
             {seat === "A" || seat === "S" || seat === "B" ? `${row.filter((s, idx) => idx < colIdx && (s === "A" || s === "S" || s === "B")).length + 1}` : ""}  
          </div>    
        ))}
      </div>
    ))}
    </div>

    <div className="controls">
        <button onClick={bookSeats}>Book</button>
        <button onClick={clearSelection}>Clear</button>
      </div>    
  </div>
  )
}

export default App
