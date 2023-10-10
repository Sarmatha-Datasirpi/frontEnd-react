import './App.css';
import React,{useEffect,useState} from 'react';
import axios from 'axios';

function App() {
  const [menu,setmenus]=useState([])
  const [items,setItems]= useState([])

  useEffect(()=>{
    axios.get('http://localhost:3030/items')
    .then(res =>{
         setmenus(Object.keys(res.data[0]))
         setItems(res.data)
    })
  }, [])
  return (
    <div clasname ="container mt-5">
      <table clasname ="table">
        <thead>
          <tr>
           <td>MENUS</td>
           </tr>
           <tr>
            {
              menu.map((c,i)=>(
                <th key={i}>{c}</th>
              ))
            }
           </tr>
       </thead>
       <tbody>
        {
          items.map((d,i)=>(
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.description}</td>
              <td>{d.price}</td>
            </tr>
          ))
        }
       </tbody>

      </table>
    </div>
    
  );
}

export default App;
