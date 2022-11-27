import { AuthProvider } from "./contexts/auth";
import { ColorModeProvider } from "./contexts/theme";
import { WSProvider } from "./contexts/webSocket";
import { AppRouter } from "./router";

/**
 * Function App component
 * @returns {JSX.Element} Main App Component
 */
function App() {
  return (
    <AuthProvider>
      <WSProvider>
        <ColorModeProvider>
          <AppRouter />
        </ColorModeProvider>
      </WSProvider>
    </AuthProvider>
  );
}

export default App;
