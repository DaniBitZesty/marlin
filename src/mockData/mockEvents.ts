// Define the BycatchEvent type
export type Event = {
  id: number;
  latitude: number;
  longitude: number;
  time: string;
  date: string;
  severity: "high" | "medium" | "low";
  thumbnail: string;
  vessel: string;
  bycatch_type: string;
};

export const mockEvents: Event[] = [
  {"id":1,"vessel":"USS Enterprise","latitude":47,"longitude":-19,"date":"11/25/2022","bycatch_type":"Seabird","severity":"low","time":"6:48 AM","thumbnail":"https://images.unsplash.com/photo-1718300176057-33348fffd169?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  {"id":2,"vessel":"SS Great Britain","latitude":47,"longitude":-14,"date":"03/06/2022","bycatch_type":"Turtle","severity":"high","time":"3:07 AM","thumbnail":"https://images.unsplash.com/photo-1555689857-0dd2ff929ecc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  {"id":3,"vessel":"RMS Lusitania","latitude":48,"longitude":-4,"date":"05/19/2022","bycatch_type":"Porpoise","severity":"high","time":"8:10 PM","thumbnail":"https://images.unsplash.com/photo-1710438488907-49cc0d395ecc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  {"id":4,"vessel":"HMS Victory","latitude":49,"longitude":-16,"date":"09/20/2022","bycatch_type":"Porpoise","severity":"medium","time":"9:05 AM","thumbnail":"https://images.unsplash.com/photo-1555689857-0dd2ff929ecc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  {"id":5,"vessel":"SS Normandie","latitude":49,"longitude":-21,"date":"07/02/2022","bycatch_type":"Dolphin","severity":"high","time":"5:57 PM","thumbnail":"https://images.unsplash.com/photo-1710438488907-49cc0d395ecc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
];
