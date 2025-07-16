import React from "react";
import ToDoList from "./ToDoList";

function App() {
  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <ToDoList />

      {/* Creator Footer */}
      <footer style={{
        marginTop: '2rem',
        textAlign: 'center',
        fontSize: '0.9rem',
        color: 'gray',
       
      }}>
        Made by <strong>EDcripted</strong>
      </footer>
    </div>
  );
}

export default App;
