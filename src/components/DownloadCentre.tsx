import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Download, FileText, Video, Database, Calendar as CalendarIcon, Clock, CheckCircle } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useState } from "react";

const availableVessels = [
  "FV Ocean Explorer",
  "FV Sea Guardian",
  "FV Atlantic Dawn",
  "FV Marine Pride",
  "FV Coastal Hunter"
];

const recentDownloads = [
  {
    id: 1,
    name: "Bycatch_Events_2025-06-20_to_2025-06-26.csv",
    type: "CSV",
    size: "2.4 MB",
    status: "completed",
    downloadedAt: "2025-06-26 14:30:00"
  },
  {
    id: 2,
    name: "Video_FV-Ocean-Explorer_2025-06-26.mp4",
    type: "Video",
    size: "1.2 GB",
    status: "completed",
    downloadedAt: "2025-06-26 13:45:00"
  },
  {
    id: 3,
    name: "GPS_Tracks_All_Vessels_Weekly.json",
    type: "JSON",
    size: "15.8 MB",
    status: "in_progress",
    downloadedAt: "2025-06-26 14:35:00",
    progress: 67
  }
];

export function DownloadCentre() {
  const [selectedVessels, setSelectedVessels] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [dataTypes, setDataTypes] = useState<string[]>([]);
  const [exportFormat, setExportFormat] = useState("csv");

  const handleVesselToggle = (vessel: string) => {
    setSelectedVessels(prev =>
      prev.includes(vessel)
        ? prev.filter(v => v !== vessel)
        : [...prev, vessel]
    );
  };

  const handleDataTypeToggle = (type: string) => {
    setDataTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const generateDownload = () => {
    // Mock download generation
    const newDownload = {
      id: Date.now(),
      name: `Export_${dataTypes.join('_')}_${new Date().toISOString().split('T')[0]}.${exportFormat}`,
      type: exportFormat.toUpperCase(),
      size: "Processing...",
      status: "in_progress",
      downloadedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      progress: 0
    };

    // This would normally trigger the actual download process
    console.log("Generating download:", newDownload);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Export Configuration */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-ocean-blue" />
            Data Export Configuration
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Date Range Selection */}
          <div className="space-y-2">
            <label className="text-sm">Date Range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                    ) : (
                      dateRange.from.toLocaleDateString()
                    )
                  ) : (
                    "Select date range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                {/* ✅ Only render Calendar if dateRange is defined */}
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Vessel Selection */}
          <div className="space-y-2">
            <label className="text-sm">Select Vessels</label>
            <div className="grid grid-cols-2 gap-2">
              {availableVessels.map((vessel) => (
                <div key={vessel} className="flex items-center space-x-2 p-2 border rounded-lg">
                  <Checkbox
                    id={vessel}
                    checked={selectedVessels.includes(vessel)}
                    onCheckedChange={() => handleVesselToggle(vessel)}
                  />
                  <label htmlFor={vessel} className="text-sm cursor-pointer flex-1">
                    {vessel}
                  </label>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedVessels(availableVessels)}
            >
              Select All
            </Button>
          </div>

          {/* Data Type Selection */}
          <div className="space-y-2">
            <label className="text-sm">Data Types</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "bycatch", label: "Bycatch Events", icon: FileText },
                { id: "video", label: "Video Footage", icon: Video },
                { id: "gps", label: "GPS Tracks", icon: Database },
                { id: "audio", label: "Audio Logs", icon: Database }
              ].map((type) => (
                <div key={type.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                  <Checkbox
                    id={type.id}
                    checked={dataTypes.includes(type.id)}
                    onCheckedChange={() => handleDataTypeToggle(type.id)}
                  />
                  <type.icon className="w-4 h-4 text-muted-foreground" />
                  <label htmlFor={type.id} className="text-sm cursor-pointer flex-1">
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Export Format */}
          <div className="space-y-2">
            <label className="text-sm">Export Format</label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV - Comma Separated Values</SelectItem>
                <SelectItem value="json">JSON - JavaScript Object Notation</SelectItem>
                <SelectItem value="xlsx">XLSX - Excel Spreadsheet</SelectItem>
                <SelectItem value="zip">ZIP - Compressed Archive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Generate Button */}
          <div className="pt-4 border-t">
            <Button
              onClick={generateDownload}
              disabled={selectedVessels.length === 0 || dataTypes.length === 0}
              className="w-full bg-ocean-blue hover:bg-ocean-blue-dark"
            >
              <Download className="w-4 h-4 mr-2" />
              Generate Export
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Export will be available in the downloads section
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Downloads */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-ocean-blue" />
            Recent Downloads
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {recentDownloads.map((download) => (
            <div key={download.id} className="p-3 border rounded-lg space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{download.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {download.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{download.size}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {download.status === 'completed' ? (
                    <CheckCircle className="w-4 h-4 text-sea-green" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-ocean-blue border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
              </div>

              {download.status === 'in_progress' && download.progress !== undefined && (
                <div className="space-y-1">
                  <Progress value={download.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">{download.progress}% complete</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {new Date(download.downloadedAt).toLocaleString()}
                </span>

                {download.status === 'completed' && (
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    <Download className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full mt-3">
            View All Downloads
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
