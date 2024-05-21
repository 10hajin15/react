import React from "react";
import MyReact from "./MyReact";
import createEventEmitter from "./shared/lib/EventEmitter"

const App = () => {
  return (
    <CountProvider>
      <Count />
      <PlusButton />
    </CountProvider>
  )
}

export default App;

const countContext = MyReact.createContext({
  count: 0,
  setCount: () => {}
})

class CountProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  render() {
    const value = {
      count: this.state.count,
      setCount: nextValue => this.setState({count: nextValue})
    }
    return (
      <countContext.Provider value={value}>
        {this.props.children}
      </countContext.Provider>
    )
  }
}

const Count = () => (
  <countContext.Consumer>
    {value => <div>{value.count}</div>}
  </countContext.Consumer>
)

const PlusButton = () => (
  <countContext.Consumer>
    {(value) => (
      <button onClick={() => value.setCount(value.count+1)}>+ 카운트 올리기</button>
    )}
  </countContext.Consumer>
)