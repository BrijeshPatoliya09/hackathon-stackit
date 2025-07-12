
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import QuestionDetail from "./pages/QuestionDetail";
import QuestionComments from "./pages/QuestionComments";
import Notifications from "./pages/Notifications";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import CookiePolicy from "./pages/CookiePolicy";
import Guidelines from "./pages/Guidelines";
import NotFound from "./pages/NotFound";
import ProtectedPageWrapper from "./components/ProtectedPageWrapper";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider 
      defaultTheme="system"
      storageKey="stackit-theme"
      themes={["light", "dark", "system"]}
      attribute="class"
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <NotificationProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="question/:id" element={<QuestionDetail />} />
                  <Route path="question/:id/answers" element={<QuestionComments />} />
                  
                  {/* Public Pages */}
                  <Route path="privacy" element={<PrivacyPolicy />} />
                  <Route path="terms" element={<TermsOfService />} />
                  <Route path="about" element={<About />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="cookie-policy" element={<CookiePolicy />} />
                  <Route path="guidelines" element={<Guidelines />} />
                  
                  {/* Pages that show login dialog if not authenticated */}
                  <Route path="careers" element={
                    <ProtectedPageWrapper>
                      <Careers />
                    </ProtectedPageWrapper>
                  } />
                  <Route path="contact" element={
                    <ProtectedPageWrapper>
                      <Contact />
                    </ProtectedPageWrapper>
                  } />
                  
                  {/* Protected Routes */}
                  <Route path="profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="notifications" element={
                    <ProtectedRoute>
                      <Notifications />
                    </ProtectedRoute>
                  } />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </NotificationProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
