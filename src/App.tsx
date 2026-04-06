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
import ForgotPassword from "./pages/ForgotPassword";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

// Manufacturer Pages
import ManufacturerProfile from "./pages/manufacturer/ManufacturerProfile";
import ManufacturerProducts from "./pages/manufacturer/ManufacturerProducts";
import ManufacturerRfqs from "./pages/manufacturer/ManufacturerRfqs";

// Brand Pages
import ManufacturerDiscovery from "./pages/brand/ManufacturerDiscovery";
import ManufacturerProfileView from "./pages/brand/ManufacturerProfileView";
import BrandRfqs from "./pages/brand/BrandRfqs";
import CreateRfq from "./pages/brand/CreateRfq";
import BrandProfile from "./pages/brand/BrandProfile";
import CreateCampaign from "./pages/brand/CreateCampaign";
import BrandApplications from "./pages/brand/BrandApplications";

// Influencer Pages
import InfluencerMarketplace from "./pages/influencer/InfluencerMarketplace";
import InfluencerApplications from "./pages/influencer/InfluencerApplications";
import InfluencerProfile from "./pages/influencer/InfluencerProfile";

// Platform Pages
import Messaging from "./pages/platform/Messaging";
import PlatformSettings from "./pages/platform/Settings";
import AIMatching from "./pages/platform/AIMatching";
import Analytics from "./pages/platform/Analytics";
import ContractGeneration from "./pages/platform/ContractGeneration";
import EscrowPayment from "./pages/platform/EscrowPayment";
import SampleManagement from "./pages/platform/SampleManagement";
import CampaignAnalytics from "./pages/platform/CampaignAnalytics";
import CampaignTracking from "./pages/platform/CampaignTracking";
import DisputeResolution from "./pages/platform/DisputeResolution";
import InvoicingPayments from "./pages/platform/InvoicingPayments";
import PaymentsWallets from "./pages/platform/PaymentsWallets";
import IngredientDatabase from "./pages/platform/IngredientDatabase";
import RegulatoryCompliance from "./pages/platform/RegulatoryCompliance";
import MarketIntelligence from "./pages/platform/MarketIntelligence";
import InfluencerDiscovery from "./pages/platform/InfluencerDiscovery";
import RfqManagement from "./pages/platform/RfqManagement";
import CampaignManager from "./pages/platform/CampaignManager";
import UserProfileManagement from "./pages/platform/UserProfileManagement";
import AdminDashboard from "./pages/platform/AdminDashboard";

// Demo Pages (investor presentations)
import DemoFormulationCanvas from "./pages/demo/DemoFormulationCanvas";
import DemoSettings from "./pages/demo/DemoSettings";
import DemoIngredientDatabase from "./pages/demo/DemoIngredientDatabase";
import DemoInfluencerFeedback from "./pages/demo/DemoInfluencerFeedback";
import DemoInfluencerOnboarding from "./pages/demo/DemoInfluencerOnboarding";
import DemoInfluencerProfile from "./pages/demo/DemoInfluencerProfile";
import DemoInvoicing from "./pages/demo/DemoInvoicing";
import DemoManufacturerOnboarding from "./pages/demo/DemoManufacturerOnboarding";
import DemoMarketIntelligence from "./pages/demo/DemoMarketIntelligence";
import DemoMessagingV2 from "./pages/demo/DemoMessagingV2";
import DemoPlatformDashboard from "./pages/demo/DemoPlatformDashboard";
import DemoSuccessReport from "./pages/demo/DemoSuccessReport";
import DemoFinalApproval from "./pages/demo/DemoFinalApproval";
import DemoComplianceTracker from "./pages/demo/DemoComplianceTracker";
import DemoRfqManagement from "./pages/demo/DemoRfqManagement";
import DemoSampleTracking from "./pages/demo/DemoSampleTracking";
import DemoSustainability from "./pages/demo/DemoSustainability";
import DemoInfluencerDiscovery from "./pages/demo/DemoInfluencerDiscovery";
import DemoUserProfile from "./pages/demo/DemoUserProfile";

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
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

            {/* Protected onboarding routes */}
            <Route path="/select-role" element={<ProtectedRoute><SelectRole /></ProtectedRoute>} />
            <Route path="/create-profile" element={<ProtectedRoute requireRole><CreateProfile /></ProtectedRoute>} />

            {/* Protected dashboard */}
            <Route path="/dashboard" element={<ProtectedRoute requireRole requireProfile><Dashboard /></ProtectedRoute>} />

            {/* Manufacturer routes */}
            <Route path="/manufacturer/profile" element={<ProtectedRoute requireRole requireProfile><ManufacturerProfile /></ProtectedRoute>} />
            <Route path="/manufacturer/products" element={<ProtectedRoute requireRole requireProfile><ManufacturerProducts /></ProtectedRoute>} />
            <Route path="/manufacturer/rfqs" element={<ProtectedRoute requireRole requireProfile><ManufacturerRfqs /></ProtectedRoute>} />

            {/* Brand routes */}
            <Route path="/brand/profile" element={<ProtectedRoute requireRole requireProfile><BrandProfile /></ProtectedRoute>} />
            <Route path="/brand/manufacturers" element={<ProtectedRoute requireRole requireProfile><ManufacturerDiscovery /></ProtectedRoute>} />
            <Route path="/brand/manufacturers/:manufacturerId" element={<ProtectedRoute requireRole requireProfile><ManufacturerProfileView /></ProtectedRoute>} />
            <Route path="/brand/rfqs" element={<ProtectedRoute requireRole requireProfile><BrandRfqs /></ProtectedRoute>} />
            <Route path="/brand/rfqs/create" element={<ProtectedRoute requireRole requireProfile><CreateRfq /></ProtectedRoute>} />
            <Route path="/brand/campaigns/create" element={<ProtectedRoute requireRole requireProfile><CreateCampaign /></ProtectedRoute>} />
            <Route path="/brand/applications" element={<ProtectedRoute requireRole requireProfile><BrandApplications /></ProtectedRoute>} />

            {/* Influencer routes */}
            <Route path="/influencer/profile" element={<ProtectedRoute requireRole requireProfile><InfluencerProfile /></ProtectedRoute>} />
            <Route path="/influencer/marketplace" element={<ProtectedRoute requireRole requireProfile><InfluencerMarketplace /></ProtectedRoute>} />
            <Route path="/influencer/applications" element={<ProtectedRoute requireRole requireProfile><InfluencerApplications /></ProtectedRoute>} />

            {/* Platform-wide routes */}
            <Route path="/messages" element={<ProtectedRoute requireRole requireProfile><Messaging /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute requireRole requireProfile><PlatformSettings /></ProtectedRoute>} />
            <Route path="/ai-matching" element={<ProtectedRoute requireRole requireProfile><AIMatching /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute requireRole requireProfile><Analytics /></ProtectedRoute>} />
            <Route path="/contracts" element={<ProtectedRoute requireRole requireProfile><ContractGeneration /></ProtectedRoute>} />
            <Route path="/escrow" element={<ProtectedRoute requireRole requireProfile><EscrowPayment /></ProtectedRoute>} />
            <Route path="/sample-tracking" element={<ProtectedRoute requireRole requireProfile><SampleManagement /></ProtectedRoute>} />
            <Route path="/campaign-analytics" element={<ProtectedRoute requireRole requireProfile><CampaignAnalytics /></ProtectedRoute>} />
            <Route path="/campaign-tracking" element={<ProtectedRoute requireRole requireProfile><CampaignTracking /></ProtectedRoute>} />
            <Route path="/disputes" element={<ProtectedRoute requireRole requireProfile><DisputeResolution /></ProtectedRoute>} />
            <Route path="/invoicing" element={<ProtectedRoute requireRole requireProfile><InvoicingPayments /></ProtectedRoute>} />
            <Route path="/payments" element={<ProtectedRoute requireRole requireProfile><PaymentsWallets /></ProtectedRoute>} />
            <Route path="/ingredients" element={<ProtectedRoute requireRole requireProfile><IngredientDatabase /></ProtectedRoute>} />
            <Route path="/compliance" element={<ProtectedRoute requireRole requireProfile><RegulatoryCompliance /></ProtectedRoute>} />
            <Route path="/market-intelligence" element={<ProtectedRoute requireRole requireProfile><MarketIntelligence /></ProtectedRoute>} />
            <Route path="/influencer-discovery" element={<ProtectedRoute requireRole requireProfile><InfluencerDiscovery /></ProtectedRoute>} />
            <Route path="/rfq-management" element={<ProtectedRoute requireRole requireProfile><RfqManagement /></ProtectedRoute>} />
            <Route path="/campaign-manager" element={<ProtectedRoute requireRole requireProfile><CampaignManager /></ProtectedRoute>} />
            <Route path="/user-management" element={<ProtectedRoute requireRole requireProfile><UserProfileManagement /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute requireRole requireProfile><AdminDashboard /></ProtectedRoute>} />

            {/* Demo Pages (investor presentations) */}
            <Route path="/demo/dashboard" element={<DemoPlatformDashboard />} />
            <Route path="/demo/success-report" element={<DemoSuccessReport />} />
            <Route path="/demo/final-approval" element={<DemoFinalApproval />} />
            <Route path="/demo/compliance-tracker" element={<DemoComplianceTracker />} />
            <Route path="/demo/rfq" element={<DemoRfqManagement />} />
            <Route path="/demo/sample-tracking" element={<DemoSampleTracking />} />
            <Route path="/demo/sustainability" element={<DemoSustainability />} />
            <Route path="/demo/influencer-discovery" element={<DemoInfluencerDiscovery />} />
            <Route path="/demo/user-profile" element={<DemoUserProfile />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </FirebaseAuthProvider>
  </QueryClientProvider>
);

export default App;
