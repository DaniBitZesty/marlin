import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { DateRange } from "react-day-picker";
import { AlertTriangle, Download, Eye, MapPin, Calendar as CalendarIcon, Search } from "lucide-react";
import { useState } from "react";

const eventsData = [
  {
    id: 1,
    timestamp: "2025-06-26 14:23:15",
    vesselName: "FV Ocean Explorer",
    vesselId: "UK-001-2024",
    location: { lat: 54.2, lon: -2.1 },
    species: "Harbour Porpoise",
    confidence: 94,
    status: "Reviewed",
    reviewer: "Dr. Sarah Wilson",
    severity: "High"
  },
  {
    id: 2,
    timestamp: "2025-06-26 12:45:30",
    vesselName: "FV Sea Guardian",
    vesselId: "UK-002-2024",
    location: { lat: 53.8, lon: -1.9 },
    species: "Atlantic Cod",
    confidence: 87,
    status: "Pending",
    reviewer: null,
    severity: "Low"
  },
  {
    id: 3,
    timestamp: "2025-06-26 09:15:45",
    vesselName: "FV Atlantic Dawn",
    vesselId: "UK-003-2024",
    location: { lat: 54.5, lon: -2.3 },
    species: "Grey Seal",
    confidence: 96,
    status: "Reviewed",
    reviewer: "Dr. James Mitchell",
    severity: "High"
  },
  {
    id: 4,
    timestamp: "2025-06-25 16:30:22",
    vesselName: "FV Marine Pride",
    vesselId: "UK-004-2024",
    location: { lat: 53.5, lon: -1.7 },
    species: "Seabird (Gannet)",
    confidence: 78,
    status: "Under Review",
    reviewer: "Dr. Sarah Wilson",
    severity: "Medium"
  },
  {
    id: 5,
    timestamp: "2025-06-25 11:18:33",
    vesselName: "FV Ocean Explorer",
    vesselId: "UK-001-2024",
    location: { lat: 54.1, lon: -2.0 },
    species: "Dolphin",
    confidence: 92,
    status: "Reviewed",
    reviewer: "Dr. James Mitchell",
    severity: "High"
  }
];

export function EventsTable() {
  const [filteredData, setFilteredData] = useState(eventsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [speciesFilter, setSpeciesFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterData(value, statusFilter, speciesFilter, severityFilter);
  };

  const filterData = (search: string, status: string, species: string, severity: string) => {
    let filtered = eventsData;

    if (search) {
      filtered = filtered.filter(
        (event) =>
          event.vesselName.toLowerCase().includes(search.toLowerCase()) ||
          event.species.toLowerCase().includes(search.toLowerCase()) ||
          event.vesselId.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "all") {
      filtered = filtered.filter((event) => event.status.toLowerCase() === status);
    }

    if (species !== "all") {
      filtered = filtered.filter((event) => event.species.toLowerCase().includes(species.toLowerCase()));
    }

    if (severity !== "all") {
      filtered = filtered.filter((event) => event.severity.toLowerCase() === severity.toLowerCase());
    }

    setFilteredData(filtered);
  };

  const exportToCsv = () => {
    const csvContent = [
      "Timestamp,Vessel Name,Vessel ID,Latitude,Longitude,Species,Confidence,Status,Reviewer,Severity",
      ...filteredData.map(event =>
        `${event.timestamp},${event.vesselName},${event.vesselId},${event.location.lat},${event.location.lon},${event.species},${event.confidence}%,${event.status},${event.reviewer || 'N/A'},${event.severity}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marlin-bycatch-events-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Bycatch Events
            <Badge variant="secondary">{filteredData.length} events</Badge>
          </CardTitle>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={exportToCsv} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* <Select value={statusFilter} onValueChange={(value) => {
            setStatusFilter(value);
            filterData(searchTerm, value, speciesFilter, severityFilter);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="under review">Under Review</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
            </SelectContent>
          </Select> */}

          <Select value={speciesFilter} onValueChange={(value) => {
            setSpeciesFilter(value);
            filterData(searchTerm, statusFilter, value, severityFilter);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Species" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Species</SelectItem>
              <SelectItem value="porpoise">Harbour Porpoise</SelectItem>
              <SelectItem value="seal">Seal</SelectItem>
              <SelectItem value="dolphin">Dolphin</SelectItem>
              <SelectItem value="seabird">Seabird</SelectItem>
              <SelectItem value="cod">Atlantic Cod</SelectItem>
            </SelectContent>
          </Select>

          <Select value={severityFilter} onValueChange={(value) => {
            setSeverityFilter(value);
            filterData(searchTerm, statusFilter, speciesFilter, value);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Date Range
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Events Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Vessel</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Species</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Severity</TableHead>
                {/* <TableHead>Status</TableHead> */}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-mono text-xs">
                    {new Date(event.timestamp).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit'
                    })}<br />
                    {new Date(event.timestamp).toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{event.vesselName}</p>
                      <p className="text-xs text-muted-foreground">{event.vesselId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-xs">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location.lat}°N</span>
                      <span>{Math.abs(event.location.lon)}°W</span>
                    </div>
                  </TableCell>
                  <TableCell>{event.species}</TableCell>
                  <TableCell>
                    <Badge
                      variant={event.confidence >= 90 ? 'default' : event.confidence >= 80 ? 'secondary' : 'outline'}
                      className={event.confidence >= 90 ? 'bg-sea-green' : ''}
                    >
                      {event.confidence}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        event.severity === 'High' ? 'destructive' :
                        event.severity === 'Medium' ? 'secondary' :
                        'outline'
                      }
                    >
                      {event.severity}
                    </Badge>
                  </TableCell>
                  {/* <TableCell>
                    <div>
                      <Badge
                        variant={
                          event.status === 'Reviewed' ? 'default' :
                          event.status === 'Under Review' ? 'secondary' :
                          'outline'
                        }
                        className={event.status === 'Reviewed' ? 'bg-sea-green' : ''}
                      >
                        {event.status}
                      </Badge>
                      {event.reviewer && (
                        <p className="text-xs text-muted-foreground mt-1">{event.reviewer}</p>
                      )}
                    </div>
                  </TableCell> */}
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MapPin className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No events found matching your filters</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
