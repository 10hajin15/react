## Context
* 리액트에서는 부모 컴포넌트에서 자식 컴포넌트에 데이터를 전달하기 위해서는 props를 통해 넘겨주어야 한다. 전달할 컴포넌트와 전달 받을 컴포넌트가 인접해 있으면 상관없지만, 떨어져 있어 직접 전달할 수 없다면 자식에게, 자식의 자식에게, 자식의 자식의 자식에게 전달해야만 한다. 이를 `prop drilling`이라고 한다.
* `prop drilling`의 문제
- 데이터의 출처를 파악하기 어렵다. (컴포넌트의 깊이가 깊어질수록)
- 고유의 역할과 무관하게 메시지를 전달받는 컴포넌트가 생긴다.

<br>

### `createContext`
* 멀리 떨어진 객체 간 메시지를 전달하기 위해 이벤트 구독 패턴을 사용
- Provider: Context 오브젝트에 포함된 React 컴포넌트인 Provider는 context를 구독하는 컴포넌트들에게 context의 변화를 알리는 역할
- Consumer: context 변화를 구독하는 React 컴포넌트



> 컨텍스트를 사용하는 것만이 정답이 아닐 수 있다. 오히려 컴포넌트 합성, 렌더 프롭을 이용하는 것이 훨씬 간단할 수 있기 때문에 상황을 잘 고려하여 사용!

<br>

---
참고  
https://jeonghwan-kim.github.io/2023/06/24/lecture-react-season2-part2-ch1

https://ko.legacy.reactjs.org/docs/context.html#before-you-use-context