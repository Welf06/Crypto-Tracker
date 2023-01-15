import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Table from './components/Table';
import TableMobile from './components/TableMobile';

import './styles/App.css';

function App() {
  if (window.innerWidth < 768) 
    return(
      <div className="App">
        <Navbar />
        <Carousel />
        <TableMobile />
      </div>
    );
  

  return (
    <div className="App">
      <Navbar />
      <Carousel />
      <Table />
    </div>
  );
}

export default App;
