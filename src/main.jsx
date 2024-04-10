import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from './components/List.jsx';
import Add from './components/Add.jsx';
import Edit from './components/Edit.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<List />} />
      <Route path='/edit/:id' element={<Edit />} />
      <Route path='/add/' element={<Add />} />
      <Route path='*' element={<>Page Not Found</>} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
