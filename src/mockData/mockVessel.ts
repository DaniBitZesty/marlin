// Defines the Vessel type
export type Vessel = {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  speed_knots: number;
  heading: number;
  status: "active" | "warning" | "inactive";
  last_event: string;
};

// Mock data for vessels
export const mockVessels: Vessel[] = [
  {"id":1,"name":"RMS Lusitania","latitude":50,"longitude":-4,"speed_knots":24.8,"heading":254,"status":"warning","last_event":"07/19/2025"},
  {"id":2,"name":"RMS Lusitania","latitude":51,"longitude":-14,"speed_knots":7.86,"heading":189,"status":"inactive","last_event":"07/04/2025"},
  {"id":3,"name":"SS Great Britain","latitude":52,"longitude":-10,"speed_knots":19.22,"heading":305,"status":"inactive","last_event":"07/07/2025"},
  {"id":4,"name":"USS Constitution","latitude":49,"longitude":-9,"speed_knots":10.19,"heading":332,"status":"inactive","last_event":"07/01/2025"},
  {"id":5,"name":"SS Great Britain","latitude":52,"longitude":-8,"speed_knots":4.79,"heading":59,"status":"inactive","last_event":"07/20/2025"},
  {"id":6,"name":"HMS Bounty","latitude":51,"longitude":-18,"speed_knots":22.59,"heading":100,"status":"inactive","last_event":"07/09/2025"},
  {"id":7,"name":"USS Constitution","latitude":50,"longitude":-18,"speed_knots":6.88,"heading":178,"status":"inactive","last_event":"07/08/2025"},
  {"id":8,"name":"SS Great Britain","latitude":50,"longitude":-13,"speed_knots":8.96,"heading":186,"status":"inactive","last_event":"07/12/2025"},
  {"id":9,"name":"USS Enterprise","latitude":50,"longitude":-16,"speed_knots":3.54,"heading":320,"status":"active","last_event":"07/13/2025"},
  {"id":10,"name":"SS Normandie","latitude":52,"longitude":-14,"speed_knots":28.05,"heading":325,"status":"active","last_event":"07/20/2025"}
];
