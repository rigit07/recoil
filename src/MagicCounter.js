import {
  atom,
  useRecoilValue
} from 'recoil';
import {
  graphQLSelector
} from 'recoil-relay';
import {
  myEnvironmentKey
} from './store/environment';
import graphql from 'babel-plugin-relay/macro';


// const serverRequest = () => fetch("http://localhost:4999/api").then(response => response.json());

const currentIDAtom = atom({
  key: 'currentIDAtom',
  default: 1
})

const userNameQuery = graphQLSelector({
  key: 'UserName',
  environment: myEnvironmentKey,
  query: graphql`
    query MagicCounterHelloQuery{
      world
    }
  `,
  variables: ({get}) => ({id: get(currentIDAtom)}),
  mapResponse: data => data.user?.name,
});

const MagicCounter = () => {

  const userName = useRecoilValue(userNameQuery);
  // const executeSomeAsyncFn = () => someAsync();

  return (
    <>
      <table width={600}>
        <tbody>
          <tr>
            <td colSpan={4}>
              MagicCounter: {userName}
            </td>
          </tr>
          <tr>
            <td>
              {/* <button onClick={() => executeSomeAsyncFn()}>Async Function</button> */}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default MagicCounter;
