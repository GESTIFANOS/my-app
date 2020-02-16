import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import FAutoComplete from './components/widgets/FAutoComplete';
import FSelect from './components/widgets/FSelect';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  notifyParent = (key, value) => {
     console.log(key, value)  

  }
   
  render() {
    return (
      <div className="App">
        <FAutoComplete name='customer' 
        url='https://country.register.gov.uk/records.json?page-size=5000'
        notifyParent={this.notifyParent}/>

          <FAutoComplete
            name='carrier'

            value={this.state.data.carrier && this.state.data.carrier.id}
            label='Authority'
            data={[{id: 1, name: 'one'}, {id: 2, name: 'two'}]}
            valueRef='name'
            keyRef='id'
            notifyParent={this.notifyParent}
            />
      </div>
     
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <FAutoComplete/>
//     </div>
   
//   );
// }

export default App;
