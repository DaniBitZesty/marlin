import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Map, Satellite, Layers, AlertTriangle, Ship, MapPin } from "lucide-react";
import { useState } from "react";

const vessels = [
  { id: 1, name: "FV Ocean Explorer", x: 25, y: 30, status: "active", lastEvent: "2 mins ago" },
  { id: 2, name: "FV Sea Guardian", x: 60, y: 45, status: "warning", lastEvent: "15 mins ago" },
  { id: 3, name: "FV Atlantic Dawn", x: 40, y: 60, status: "active", lastEvent: "1 hour ago" },
  { id: 4, name: "FV Marine Pride", x: 80, y: 25, status: "inactive", lastEvent: "2 hours ago" },
];

const bycatchEvents = [
  { id: 1, x: 25, y: 32, species: "Harbour Porpoise", time: "2 mins ago", severity: "high" },
  { id: 2, x: 40, y: 62, species: "Seal", time: "1 hour ago", severity: "high" },
  { id: 3, x: 65, y: 40, species: "Seabird", time: "3 hours ago", severity: "medium" },
];

export function MapVisualization() {
  const [selectedVessel, setSelectedVessel] = useState<number | null>(null);
  const [showTracks, setShowTracks] = useState(true);
  const [showEvents, setShowEvents] = useState(true);
  const [mapLayer, setMapLayer] = useState("satellite");

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Map className="w-5 h-5 text-ocean-blue" />
            Vessel Tracking &amp; Events
          </CardTitle>

          {/* Map Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="show-tracks" className="text-sm">Vessel Tracks</Label>
              <Switch
                id="show-tracks"
                checked={showTracks}
                onCheckedChange={setShowTracks}
              />
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="show-events" className="text-sm">Bycatch Events</Label>
              <Switch
                id="show-events"
                checked={showEvents}
                onCheckedChange={setShowEvents}
              />
            </div>

            <Select value={mapLayer} onValueChange={setMapLayer}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="satellite">
                  <div className="flex items-center gap-2">
                    <Satellite className="w-4 h-4" />
                    Satellite
                  </div>
                </SelectItem>
                <SelectItem value="marine">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Marine
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="relative">
          {/* Mock Map Background */}
          <div
            className={`relative w-full h-96 rounded-lg border-2 border-dashed border-ocean-blue/20 overflow-hidden ${
              mapLayer === 'satellite'
                ? 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700'
                : 'bg-gradient-to-br from-blue-300 via-blue-200 to-cyan-200'
            }`}
          >
            {/* Grid overlay for map feel */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-10 grid-rows-8 h-full w-full">
                {Array.from({ length: 80 }).map((_, i) => (
                  <div key={i} className="border border-white/20"></div>
                ))}
              </div>
            </div>

            {/* Compass */}
            <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-2 border">
              <div className="w-8 h-8 rounded-full border-2 border-ocean-blue flex items-center justify-center text-xs text-ocean-blue">
                N
              </div>
            </div>

            {/* Scale */}
            <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-2 border">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-12 h-1 bg-ocean-blue"></div>
                <span>10 nm</span>
              </div>
            </div>

            {/* Vessel Tracks */}
            {showTracks && (
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {vessels.map((vessel) => (
                  <g key={`track-${vessel.id}`}>
                    <path
                      d={`M ${vessel.x - 10} ${vessel.y + 5} Q ${vessel.x} ${vessel.y - 10} ${vessel.x} ${vessel.y}`}
                      stroke="rgba(59, 130, 246, 0.6)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    />
                  </g>
                ))}
              </svg>
            )}

            {/* Vessels */}
            {vessels.map((vessel) => (
              <Button
                key={vessel.id}
                variant="ghost"
                className={`absolute p-1 h-8 w-8 transform -translate-x-1/2 -translate-y-1/2 hover:bg-card/90 ${
                  selectedVessel === vessel.id ? 'bg-card/90 ring-2 ring-ocean-blue' : ''
                }`}
                style={{ left: `${vessel.x}%`, top: `${vessel.y}%` }}
                onClick={() => setSelectedVessel(selectedVessel === vessel.id ? null : vessel.id)}
              >
                <Ship
                  className={`w-5 h-5 ${
                    vessel.status === 'active' ? 'text-sea-green' :
                    vessel.status === 'warning' ? 'text-destructive' :
                    'text-muted-foreground'
                  }`}
                />
              </Button>
            ))}

            {/* Bycatch Events */}
            {showEvents && bycatchEvents.map((event) => (
              <div
                key={event.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `${event.x}%`, top: `${event.y}%` }}
              >
                <div className={`w-4 h-4 rounded-full border-2 border-white ${
                  event.severity === 'high' ? 'bg-destructive' : 'bg-orange-500'
                } animate-pulse`}></div>

                {/* Event tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-card border rounded-lg p-2 shadow-lg min-w-max">
                    <p className="text-xs font-medium">{event.species}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Vessel Info Panel */}
            {selectedVessel && (
              <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm border rounded-lg p-4 min-w-64">
                {(() => {
                  const vessel = vessels.find(v => v.id === selectedVessel);
                  if (!vessel) return null;

                  return (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{vessel.name}</h3>
                        <Badge
                          variant={vessel.status === 'active' ? 'default' : vessel.status === 'warning' ? 'destructive' : 'secondary'}
                          className={vessel.status === 'active' ? 'bg-sea-green' : ''}
                        >
                          {vessel.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>Last update: {vessel.lastEvent}</p>
                        <p>Position: 54.2°N, 2.1°W</p>
                        <p>Speed: 4.2 knots</p>
                        <p>Heading: 045°</p>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Contact
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Map Legend */}
          <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Ship className="w-4 h-4 text-sea-green" />
              <span>Active Vessel</span>
            </div>
            <div className="flex items-center gap-2">
              <Ship className="w-4 h-4 text-destructive" />
              <span>Alert/Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <Ship className="w-4 h-4 text-muted-foreground" />
              <span>Inactive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive border border-white"></div>
              <span>High Priority Event</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500 border border-white"></div>
              <span>Medium Priority Event</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
