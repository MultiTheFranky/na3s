import { WSProvider } from "./contexts/webSocket";
import { AuthProvider } from './contexts/auth';
import { AppRouter } from './router';
import { ColorModeProvider } from './contexts/theme';

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
