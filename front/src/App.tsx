import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import Home from "./pages/Home";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  </TooltipProvider>
);

export default App;
