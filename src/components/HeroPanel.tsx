import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Satellite, Wifi, AlertTriangle, CheckCircle } from "lucide-react";

const eventData = [
  { date: '2025-06-26', events: 22 },
  { date: '2025-06-27', events: 12 },
  { date: '2025-06-28', events: 8 },
  { date: '2025-06-29', events: 12 },
  { date: '2025-06-30', events: 8 },
  { date: '2025-07-01', events: 19 },
  { date: '2025-07-02', events: 14 },
];

export function HeroPanel() {
  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200/50">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl text-ocean-blue">MARLIN Dashboard</h1>
              <Badge variant="outline" className="border-sea-green text-sea-green">
                <CheckCircle className="w-3 h-3 mr-1" />
                Operational
              </Badge>
            </div>
            <p className="text-muted-foreground max-w-2xl text-left">
              MARitime Low-earth-orbit Insight Network - Remote electronic monitoring system for UK fishing vessels.
              Real-time oversight powered by satellite and 5G connectivity.
            </p>
          </div>

          {/* System Status Indicators */}
          <div className="">
            <div className="flex items-center gap-2 text-sm">
              <Satellite className="w-4 h-4 text-blue-500" />
              <span className="text-muted-foreground">Satellite</span>
              <Badge variant="outline" className="border-sea-green text-sea-green">Online</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-ocean-blue">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Active Vessels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-ocean-blue mb-1">12</div>
            <div className="text-xs text-muted-foreground">of 15 total vessels</div>
            <Progress value={80} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-aqua">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Video Footage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-aqua mb-1">341</div>
            <div className="text-xs text-muted-foreground">hours recorded this week</div>
            <div className="text-xs text-sea-green mt-1">+23% vs last week</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Bycatch Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl text-destructive mb-1">68</div>
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </div>
            <div className="text-xs text-muted-foreground">logged this week</div>
            <div className="text-xs text-destructive mt-1">+12% vs last week</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-sea-green">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Data Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-sea-green mb-1">2.4 TB</div>
            <div className="text-xs text-muted-foreground">in the last 24 hours</div>
            <div className="text-xs text-sea-green mt-1">98.5% success rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Event Frequency Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Event Frequency
            <Badge variant="secondary">Last 7 Days</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={eventData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  labelFormatter={(value) => new Date(value).toLocaleDateString('en-GB', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                  })}
                  formatter={(value) => [value, 'Events']}
                />
                <Line
                  type="monotone"
                  dataKey="events"
                  stroke="#000"
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-ocean-blue)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'var(--color-ocean-blue)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
