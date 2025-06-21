
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ViewItems from './pages/ViewItems';
import AddItems from './pages/AddItems';

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
                <Route path="/" element={<ViewItems />} />
                <Route path="/add" element={<AddItems />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
