import {Component} from 'react'
import Header from './components/Header'
import UserInputArea from './components/UserInputArea'
import Result from './components/Result'

class App extends Component {
  state = {
    findRequestSent: false,
  }

  render() {
    const {findRequestSent} = this.state

    return (
      <div>
        <Header />
        <div>{findRequestSent ? <Result /> : <UserInputArea />}</div>
      </div>
    )
  }
}

export default App
