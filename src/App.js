import TabsPanel from "./components/Tabs/Tabs";
import { Provider } from 'react-redux';
import generateStore from './redux/store';

const store = generateStore();

function App() {
  return (
    <div>
      <Provider store={store}>
        <TabsPanel />
      </Provider>
    </div>
  );
}

export default App;
