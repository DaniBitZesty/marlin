import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize, Eye, Mic, FileText } from "lucide-react";
import { useState } from "react";

const videoEvents = [
  {
    id: 1,
    vesselName: "FV Ocean Explorer",
    timestamp: "2025-06-26 14:23:15",
    duration: "00:02:34",
    type: "bycatch",
    species: "Harbour Porpoise",
    confidence: 94,
    transcript: "Large mammal spotted port side, appears to be harbour porpoise caught in net."
  },
  {
    id: 2,
    vesselName: "FV Sea Guardian",
    timestamp: "2025-06-26 12:45:30",
    duration: "00:01:18",
    type: "catch",
    species: "Atlantic Cod",
    confidence: 87,
    transcript: "Good catch of cod, approximately 15kg specimen."
  },
  {
    id: 3,
    vesselName: "FV Atlantic Dawn",
    timestamp: "2025-06-26 09:15:45",
    duration: "00:03:12",
    type: "bycatch",
    species: "Seal",
    confidence: 96,
    transcript: "Grey seal entangled in fishing net, crew working to release safely."
  }
];

export function VideoReviewPanel() {
  const [selectedEvent, setSelectedEvent] = useState(videoEvents[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState([45]);
  const [volume, setVolume] = useState([75]);
  const [showTranscript, setShowTranscript] = useState(true);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Video Player */}
      <Card className="xl:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-ocean-blue" />
              Video Review
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={selectedEvent.type === 'bycatch' ? 'destructive' : 'default'}>
                {selectedEvent.type}
              </Badge>
              <Badge variant="outline">
                {selectedEvent.confidence}% confidence
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Mock Video Player */}
          <div className="relative bg-black rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </div>
              <p className="text-sm opacity-75">
                {selectedEvent.vesselName} - {selectedEvent.species}
              </p>
              <p className="text-xs opacity-50">
                {selectedEvent.timestamp}
              </p>
            </div>

            {/* Overlay Controls */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 space-y-3">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <Slider
                    value={currentTime}
                    onValueChange={setCurrentTime}
                    max={154}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-white/75">
                    <span>00:00:45</span>
                    <span>{selectedEvent.duration}</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-white" />
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="w-20"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Vessel</p>
              <p className="font-medium">{selectedEvent.vesselName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Species</p>
              <p className="font-medium">{selectedEvent.species}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Timestamp</p>
              <p className="font-medium">{selectedEvent.timestamp}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium">{selectedEvent.duration}</p>
            </div>
          </div>

          {/* Audio Transcript */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  Audio Transcript
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTranscript(!showTranscript)}
                >
                  <FileText className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            {showTranscript && (
              <CardContent className="pt-0">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm italic">"{selectedEvent.transcript}"</p>
                  <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                    <span>Auto-generated transcript</span>
                    <span>92% accuracy</span>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </CardContent>
      </Card>

      {/* Event Selection Sidebar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-ocean-blue" />
            Recent Events
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {videoEvents.map((event) => (
            <div
              key={event.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedEvent.id === event.id
                  ? 'border-ocean-blue bg-ocean-blue/5'
                  : 'border-border hover:border-ocean-blue/50'
              }`}
              onClick={() => setSelectedEvent(event)}
            >
              <div className="flex items-start justify-between mb-2">
                <Badge
                  variant={event.type === 'bycatch' ? 'destructive' : 'default'}
                  className="text-xs"
                >
                  {event.type}
                </Badge>
                <span className="text-xs text-muted-foreground">{event.duration}</span>
              </div>

              <h4 className="font-medium text-sm mb-1">{event.vesselName}</h4>
              <p className="text-xs text-muted-foreground mb-1">{event.species}</p>
              <p className="text-xs text-muted-foreground">{event.timestamp}</p>

              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">
                  {event.confidence}% confidence
                </span>
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  <Play className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full">
            Load More Events
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
