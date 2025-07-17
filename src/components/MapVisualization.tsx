import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Map, Satellite, Layers, Ship, Play, Calendar, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet';
import vesselGreen from '../assets/icons/vessel-green.svg';
import eventPin from '../assets/icons/event-red.svg';
import type { Vessel } from '../mockData/mockVessel';
import { mockVessels } from '../mockData/mockVessel';
import type { Event } from '../mockData/mockEvents';
import { mockEvents } from '../mockData/mockEvents';
import 'leaflet/dist/leaflet.css';

export function MapVisualization() {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const [showTracks, setShowTracks] = useState(true);
  const [showEvents, setShowEvents] = useState(true);
  const [mapLayer, setMapLayer] = useState("satellite");

  // Fetch vessel data
  // useEffect(() => {
  //   const fetchVessels = async () => {
  //     try {
  //       const response = await fetch('https://my.api.mockaroo.com/vessels.json?key=ff25efd0');
  //       if (!response.ok) {
  //         throw new Error(`Network request failed with status ${response.status} (${response.statusText})`);

  //       }
  //       const data: Vessel[] = await response.json();
  //       setVessels(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching vessels:', error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchVessels();
  // }, []);

  const vesselIcon = new Icon({
    iconUrl: vesselGreen,
    iconSize: [25, 41]
  });

  // // Fetch bycatch events
  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await fetch('https://my.api.mockaroo.com/by_catch_events.json?key=ff25efd0');
  //       if (!response.ok) {
  //         throw new Error(`Network request failed with status ${response.status} (${response.statusText})`);
  //       }
  //       const data = await response.json();
  //       setEvents(data);
  //     } catch (error) {
  //       console.error('Error fetching bycatch events:', error);
  //     }
  //   };
  //   fetchEvents();
  // }, []);

  const eventIcon = new Icon({
    iconUrl: eventPin,
    iconSize: [20, 20],
  });

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Map className="w-5 h-5 text-ocean-blue" />
            Vessel Tracking & Events
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

      {/* {loading ? (
        <div className="flex items-center justify-center h-96">
          <span className="text-muted-foreground">Loading vessels...</span>
        </div>
      ) : */}
        <CardContent>
          <div className="relative">
            <div className="relative w-full h-96 rounded-lg border-2 border-ocean-blue/20 overflow-hidden">
              {/* Grid overlay for map feel */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-10 grid-rows-8 h-full w-full">
                  {Array.from({ length: 80 }).map((_, i) => (
                    <div key={i} className="border border-white/20"></div>
                  ))}
                </div>
              </div>

              {/* Compass */}
              <div className="absolute top-4 right-4 z-10">
                <div className="w-8 h-8 rounded-full bg-card/90 border-2 border-gray-600 flex items-center justify-center text-xs text-grey-600">
                  N
                </div>
              </div>

              {/* Map Container */}
              <MapContainer center={[50.50, -20.65]} zoom={5} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Vessel markers */}
                {mockVessels.map((vessel) => (
                  <Marker key={vessel.id} position={[vessel.latitude, vessel.longitude]} icon={vesselIcon}>
                    <Popup>
                      <div className="text-sm">
                        <strong>{vessel.name}</strong><br />
                        Speed: {vessel.speed_knots} knots<br />
                        Position: {vessel.latitude.toFixed(2)}°N, {vessel.longitude.toFixed(2)}°W<br />
                        Heading: {vessel.heading}°<br />
                        Status: <Badge variant={vessel.status === 'active' ? 'default' : vessel.status === 'warning' ? 'destructive' : 'secondary'}>{vessel.status}</Badge><br />
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {showEvents && mockEvents.map((event) => (
                  <Marker
                    key={event.id}
                    position={[event.latitude, event.longitude]}
                    icon={eventIcon}
                  >
                    <Popup>
                      <div className="min-w-64 max-w-80">

                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <strong className="block text-sm">{event.bycatch_type}</strong>
                            <p className="text-xs text-muted-foreground">Vessel: {event.vessel}</p>
                          </div>
                          <Badge
                            variant={event.severity === 'high' ? 'destructive' : 'secondary'}
                            className="capitalize"
                          >
                            {event.severity}
                          </Badge>
                        </div>

                        {/* Video Thumbnail */}
                        <div className="relative mb-3 group cursor-pointer">
                          <img
                            src={event.thumbnail}
                            alt={`${event.bycatch_type} event thumbnail`}
                            className="w-full h-24 object-cover rounded-sm"
                          />
                          <div className="absolute inset-0 bg-black/20 rounded-md flex items-center justify-center group-hover:bg-black/40 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                              <Play className="w-4 h-4 text-black ml-0.5" />
                            </div>
                          </div>
                        </div>

                        {/* Event Info */}
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Ship className="w-3 h-3 text-muted-foreground" />
                            <span>{event.vessel}</span>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-3 pt-2 border-t text-xs text-muted-foreground">
                          <a
                            href={event.thumbnail}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:underline"
                          >
                            Click thumbnail to view video
                          </a>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* Map Legend */}
            <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <img src={vesselGreen} alt="Vessel icon" className="w-4 h-4" />
                <span>Vessel</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={eventPin} alt="Vessel icon" className="w-4 h-4" />
                <span>Bycatch Event</span>
              </div>
            </div>
          </div>
        </CardContent>
      {/* } */}
    </Card>
  );
}
