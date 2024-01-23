import "./App.css";
import DisplayProducts from "./DisplayProducts";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>My first Apollo app 🚀</h2>
        <a
          className="App-link"
          href="https://www.apollographql.com/docs/react/get-started#step-1-setup"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn about Apollo Client
        </a>
      </header>
      <DisplayProducts />
    </div>
  );
}

export default App;
