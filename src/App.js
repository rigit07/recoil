import {
  RecoilRoot,
} from 'recoil';
// import {
//   RecoilRelayEnvironmentProvider,
// } from 'recoil-relay'
// import {
//   useRelayEnvironment
// } from 'react-relay';
import './App.css';
import Counter from "./Counter";
// import MagicCounter from "./MagicCounter";
// import {
//   myEnvironmentKey
// } from './store/environment'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RecoilRoot>
          <Counter />
        </RecoilRoot>
      </header>
    </div>
  );
}

export default App;
