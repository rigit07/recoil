import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useRecoilCallback,
} from 'recoil';

const serverRequest = () => fetch("http://localhost:4999/api").then(response => response.json());

const countState = atom({
  key: 'countState', // unique ID (with respect to other atoms/selectors)
  default: { 
    count: 12
  }, // default value (aka initial value)
  effects: [
    () => {
      console.log('first effect');
    },
    () => {
      console.log('second effect');
    }
  ]
});

const derivedCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const state = get(countState)
    return state.count * 2;
  },
});

const derivedCountStat2e = selector({
  key: 'charCountState_2', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const state = get(countState)
    return state.count * 3;
  },
});


const serv = selector({
  key: 'serv',
  get: async ({get}) => {
    const response = await serverRequest();
    const num = JSON.stringify(response).split().reduce((acc, cur) => acc + cur.charCodeAt(0), 0);
    return num
  },
});

function ServComp() {
  const num = useRecoilValue(serv);
  return <div>{num}</div>;
}


const Counter = () => {
  let [state, setCount] = useRecoilState(countState);
  const doubled = useRecoilValue(derivedCountState);
  const triple = useRecoilValue(derivedCountStat2e);

  const someAsync = useRecoilCallback(({set}) => async() => {
    const response = await serverRequest();
    const num = JSON.stringify(response).split().reduce((acc, cur) => acc + cur.charCodeAt(0), 0);
    set(countState, num);
  }, []);
  
  const incrementCount = () => setCount({ count: state.count + 1 });
  const decrementCount = () => setCount({ count: state.count - 1 });
  const multiple_2 = () => setCount({ count: state.count * 2});
  const executeSomeAsyncFn = () => someAsync();

  return (
    <>
      <table width={600}>
        <tbody>
          <tr>
            <td colSpan={4}>
              Counter: {state.count} and double: {doubled}. Triple {triple}
              <ServComp />
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={() => decrementCount()}>-1</button>
            </td>

            <td>
              <button onClick={() => incrementCount()}>+1</button>
            </td>
            
            <td>
              <button onClick={() => multiple_2()}>*2</button>
            </td>

            <td>
              <button onClick={() => executeSomeAsyncFn()}>Async Function</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Counter;
