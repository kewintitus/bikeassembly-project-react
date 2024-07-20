import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="appContent">
      <Navbar />
      <div className="routerOutlet">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
