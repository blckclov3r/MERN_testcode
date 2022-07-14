
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Header from './components/Header';


function App() {
  return (
    <BrowserRouter>
        <Header />
       <div className="App">
          <Routes>
              <Route path="/" element={<Home />} />
          </Routes>
      </div>
    </BrowserRouter>
 
  );
}

export default App;
