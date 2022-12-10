import { AuthProvider } from "./contexts/auth";
import { ColorModeProvider } from "./contexts/theme";
import { WSProvider } from "./contexts/webSocket";
import { AppRouter } from "./router";
import { BrowserRouter } from 'react-router-dom';

/**
 * Function App component
 * @returns {JSX.Element} Main App Component
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WSProvider>
          <ColorModeProvider>
            <AppRouter />
          </ColorModeProvider>
        </WSProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
