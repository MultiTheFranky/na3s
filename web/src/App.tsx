import "./App.css";
import { WebSocketLog } from "./component/webSocketLog";

import { WSProvider } from "./context/webSocket";

/**
 * Function App component
 * @returns {JSX.Element} Main App Component
 */
function App() {
  return (
    <div className="App">
      <WSProvider>
      <header className="App-header">
          <div>
            <WebSocketLog />
        </div>
        </header>
      </WSProvider>
    </div>
  );
}

export default App;
