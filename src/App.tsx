import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FirebaseAuthProvider } from "@/contexts/FirebaseAuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SelectRole from "./pages/SelectRole";
import CreateProfile from "./pages/CreateProfile";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Manufacturer Pages
import ManufacturerProfile from "./pages/manufacturer/ManufacturerProfile";
import ManufacturerProducts from "./pages/manufacturer/ManufacturerProducts";
import ManufacturerRfqs from "./pages/manufacturer/ManufacturerRfqs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FirebaseAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected onboarding routes */}
            <Route
              path="/select-role"
              element={
                <ProtectedRoute>
                  <SelectRole />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-profile"
              element={
                <ProtectedRoute requireRole>
                  <CreateProfile />
                </ProtectedRoute>
              }
            />

            {/* Protected dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requireRole requireProfile>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Manufacturer routes */}
            <Route
              path="/manufacturer/profile"
              element={
                <ProtectedRoute requireRole requireProfile>
                  <ManufacturerProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manufacturer/products"
              element={
                <ProtectedRoute requireRole requireProfile>
                  <ManufacturerProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manufacturer/rfqs"
              element={
                <ProtectedRoute requireRole requireProfile>
                  <ManufacturerRfqs />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </FirebaseAuthProvider>
  </QueryClientProvider>
);

export default App;
