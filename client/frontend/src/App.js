import './App.css';
import { Fragment } from 'react';

import InventoryTable from './components/InventoryTable'
import AddInventoryItem from './components/AddInventoryItem'

function App() {
  return (
    <Fragment>
      <AddInventoryItem/>
      <InventoryTable/>
    </Fragment>    
  );
}

export default App;
