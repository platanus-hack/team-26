"use client";
import { AuthProvider } from "../context/AuthContext";
import GraphPage from "./components/GraphPage";

const App = () => {
  return (
    <AuthProvider>
      <GraphPage />
    </AuthProvider>
  );
};

export default App;
