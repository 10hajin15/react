import React from "react";
import { getComponentName } from "./shared/lib/utils";

const App = () => {
  return (
    <>
      <EnhancedHeader />
      <EnhancedButton />
    </>
  );
};

export default App;

// [고차 컴포넌트]
// 컴포넌트가 마운트 될 때 기록한다
// 버튼 컴포넌트를 클릭할 때 기록한다
// class Header extends React.Component {
//   componentDidMount() {
//     console.log("[Header] 마운트");
//   }

//   render() {
//     return <header>Header</header>;
//   }
// }

// class Button extends React.Component {
//   componentDidMount() {
//     console.log("[Button] 마운트");
//   }

//   handleClick = () => {
//     console.log("[Button] 클릭");
//   };

//   render() {
//     return <button onClick={this.handleClick}>버튼</button>;
//   }
// }



const withLogging = (WrappedComponent) => {
  function log(message) {
    console.log(`[${getComponentName(WrappedComponent)}] ${message}`);
  }

  class WithLogging extends React.Component {
    render() {
      const enhancedProps = { log };
      return <WrappedComponent {...this.props} {...enhancedProps} />;
    }

    componentDidMount() {
      log("마운트");
    }
  }

  return WithLogging;
};

const Header = () => <header>헤더</header>
const Button = ({log}) => {
  const handleClick = () => log('클릭')
  return <button onClick={handleClick}>버튼</button>
}

const EnhancedHeader = withLogging(Header)
const EnhancedButton = withLogging(Button)