
import './App.css';
import MoviesList from './components/movies-list';
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div >
        <MoviesList />
      </div>
    </Provider>

  );
}

export default App;
