import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Ship, AlertTriangle, Database, Video, Clock, MapPin, Eye } from "lucide-react";

const recentAlerts = [
  {
    id: 1,
    type: "bycatch",
    vessel: "FV Ocean Explorer",
    message: "Bycatch event detected - Species: Harbour Porpoise",
    time: "2 mins ago",
    severity: "high"
  },
  {
    id: 2,
    type: "hardware",
    vessel: "FV Sea Guardian",
    message: "Camera offline - Port side monitoring",
    time: "15 mins ago",
    severity: "medium"
  },
  {
    id: 3,
    type: "bycatch",
    vessel: "FV Atlantic Dawn",
    message: "Bycatch event detected - Species: Seal",
    time: "1 hour ago",
    severity: "high"
  }
];

const vesselData = [
  { name: "FV Ocean Explorer", status: "active", location: "North Sea", lastUpdate: "2 mins ago" },
  { name: "FV Sea Guardian", status: "warning", location: "English Channel", lastUpdate: "15 mins ago" },
  { name: "FV Atlantic Dawn", status: "active", location: "Irish Sea", lastUpdate: "5 mins ago" },
  { name: "FV Marine Pride", status: "inactive", location: "Port - Plymouth", lastUpdate: "2 hours ago" },
];

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Vessel Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ship className="w-5 h-5 text-ocean-blue" />
            Vessel Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {vesselData.map((vessel, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-muted/50">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium">{vessel.name}</p>
                  <Badge 
                    variant={vessel.status === 'active' ? 'default' : vessel.status === 'warning' ? 'destructive' : 'secondary'}
                    className={vessel.status === 'active' ? 'bg-sea-green' : ''}
                  >
                    {vessel.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {vessel.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {vessel.lastUpdate}
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" className="w-full mt-3">
            View All Vessels
          </Button>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Recent Alerts
            <Badge variant="destructive" className="ml-auto">3</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="p-3 rounded-lg border bg-muted/50">
              <div className="flex items-start justify-between mb-2">
                <Badge 
                  variant={alert.severity === 'high' ? 'destructive' : 'secondary'}
                  className="text-xs"
                >
                  {alert.type}
                </Badge>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
              <p className="text-sm mb-1">{alert.vessel}</p>
              <p className="text-xs text-muted-foreground">{alert.message}</p>
            </div>
          ))}
          <Button variant="outline" className="w-full mt-3">
            View All Alerts
          </Button>
        </CardContent>
      </Card>

      {/* Data Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-aqua" />
            Data Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/50">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-ocean-blue" />
                <span className="text-sm">Video Data</span>
              </div>
              <div className="text-right">
                <p className="font-medium">1.8 TB</p>
                <p className="text-xs text-muted-foreground">Last 24h</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/50">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sea-green" />
                <span className="text-sm">GPS Tracks</span>
              </div>
              <div className="text-right">
                <p className="font-medium">2,847</p>
                <p className="text-xs text-muted-foreground">Position updates</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/50">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="text-sm">Events</span>
              </div>
              <div className="text-right">
                <p className="font-medium">68</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t">
            <div className="flex justify-between text-sm mb-2">
              <span>Storage Used</span>
              <span>72% of 10 TB</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-ocean-blue h-2 rounded-full" style={{ width: '72%' }}></div>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Data Management
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}