import './App.css';
import Header from './components/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import Edit from './components/Edit';


function App() {
  return (
    <>
          <BrowserRouter>
           <Header />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/edit/:id" element={<Edit />} />
     
            </Routes>
          
          </BrowserRouter>
    </>
   
  );
}

export default App;
