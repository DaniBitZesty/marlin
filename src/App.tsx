import './App.css'
import { Navigation } from "./components/Navigation";
import { HeroPanel } from "./components/HeroPanel";
import { SummaryCards } from "./components/SummaryCards";
import { MapVisualization } from "./components/MapVisualization";
import { VideoReviewPanel } from "./components/VideoReviewPanel";
import { EventsTable } from "./components/EventsTable";
import { DownloadCentre } from "./components/DownloadCentre";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent } from "./components/ui/card";
import { useState } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Panel - Always visible */}
        <HeroPanel />

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 bg-muted">
            <TabsTrigger value="overview" className="data-[state=active]:bg-ocean-blue data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-ocean-blue data-[state=active]:text-white">
              Event Analysis
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-ocean-blue data-[state=active]:text-white">
              Live Monitoring
            </TabsTrigger>
            <TabsTrigger value="downloads" className="data-[state=active]:bg-ocean-blue data-[state=active]:text-white">
              Data Exports
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <SummaryCards />
            <MapVisualization />
          </TabsContent>

          {/* Live Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <div className="">
              <Card className="">
                <CardContent className="p-6">
                  <MapVisualization />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <SummaryCards />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Event Analysis Tab */}
          <TabsContent value="events" className="space-y-6">
            <VideoReviewPanel />
            <EventsTable />
          </TabsContent>

          {/* Data Exports Tab */}
          <TabsContent value="downloads" className="space-y-6">
            <DownloadCentre />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="border-t pt-6 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <p>&copy; 2025 MARLIN - Maritime Low-earth-orbit Insight Network</p>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-ocean-blue transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-ocean-blue transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-ocean-blue transition-colors">Support</a>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t text-center">
            <p className="text-xs text-muted-foreground">
              System Status: <span className="text-sea-green">Operational</span> |
              Last Data Sync: <span className="text-ocean-blue">2 minutes ago</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
