export type JoyLevel = "High" | "Medium" | "Low";

export interface CountryJoyData {
  id: string;
  name: string;
  joyIndex: number; // 0-100
  level: JoyLevel;
  emotion: string;
  letters: number;
  priority: "CRITICAL" | "STABLE" | "ELEVATED";
  coordinates: { x: number; y: number }; // Percentage based for positioning on a custom map
}

export type Emotion = "Lonely" | "Excited" | "Hopeful" | "Anxious";

export interface LetterData {
  id: string;
  childName: string;
  age: number;
  region: string;
  text: string;
  emotion: Emotion;
  confidence: number;
  reviewed: boolean;
  timestamp: string;
}

export const worldJoyData: CountryJoyData[] = [
  {
    id: "NA",
    name: "North America",
    joyIndex: 82,
    level: "High",
    emotion: "Excited",
    letters: 12450,
    priority: "STABLE",
    coordinates: { x: 20, y: 35 },
  },
  {
    id: "SA",
    name: "South America",
    joyIndex: 65,
    level: "Medium",
    emotion: "Hopeful",
    letters: 8300,
    priority: "ELEVATED",
    coordinates: { x: 32, y: 70 },
  },
  {
    id: "EU",
    name: "Europe",
    joyIndex: 91,
    level: "High",
    emotion: "Joyful",
    letters: 15200,
    priority: "STABLE",
    coordinates: { x: 50, y: 30 },
  },
  {
    id: "AF",
    name: "Africa",
    joyIndex: 45,
    level: "Low",
    emotion: "Anticipating",
    letters: 5100,
    priority: "CRITICAL",
    coordinates: { x: 52, y: 60 },
  },
  {
    id: "AS",
    name: "Asia",
    joyIndex: 78,
    level: "Medium",
    emotion: "Peaceful",
    letters: 22000,
    priority: "ELEVATED",
    coordinates: { x: 75, y: 40 },
  },
  {
    id: "OC",
    name: "Oceania",
    joyIndex: 88,
    level: "High",
    emotion: "Warm",
    letters: 4200,
    priority: "STABLE",
    coordinates: { x: 85, y: 75 },
  },
];

export const worldLetters: LetterData[] = [
  {
    id: "L1",
    childName: "Timmy",
    age: 7,
    region: "North America",
    text: "Dear Santa, I've been really good this year. I helped my mom with the dishes and I didn't fight with my sister once! Well, maybe once. I'm really hoping for a telescope to see the stars.",
    emotion: "Hopeful",
    confidence: 94,
    reviewed: false,
    timestamp: "2h ago",
  },
  {
    id: "L2",
    childName: "Sarah",
    age: 9,
    region: "Europe",
    text: "Hi Santa. I'm a bit sad because we moved to a new house and I don't have any friends here yet. Could you maybe bring me something that helps me meet new people?",
    emotion: "Lonely",
    confidence: 88,
    reviewed: false,
    timestamp: "4h ago",
  },
  {
    id: "L3",
    childName: "Yuki",
    age: 6,
    region: "Asia",
    text: "SANTA!! I AM SO EXCITED!! Is it Christmas yet? I want a robot that can dance and a shiny red bike and maybe a giant chocolate bar! Love you Santa!",
    emotion: "Excited",
    confidence: 98,
    reviewed: true,
    timestamp: "1d ago",
  },
  {
    id: "L4",
    childName: "Lucas",
    age: 10,
    region: "South America",
    text: "Dear Santa, I'm worried about the reindeer. Is it cold at the North Pole? Do they have enough carrots? I hope you can make it to our house safely.",
    emotion: "Anxious",
    confidence: 72,
    reviewed: false,
    timestamp: "6h ago",
  },
];
export type Task =
  | "Idle"
  | "Build Toys"
  | "Repair Toys"
  | "Gift Wrapping"
  | "Sleigh Maintenance";

export interface ElfData {
  id: string;
  name: string;
  energy: number; // 0-100
  mood: "Happy" | "Tired" | "Grumpy" | "Energetic";
  task: Task;
  efficiency: number;
}

export const initialElves: ElfData[] = [
  {
    id: "E1",
    name: "Alabaster",
    energy: 85,
    mood: "Happy",
    task: "Build Toys",
    efficiency: 92,
  },
  {
    id: "E2",
    name: "Bushy",
    energy: 45,
    mood: "Tired",
    task: "Idle",
    efficiency: 78,
  },
  {
    id: "E3",
    name: "Shinny",
    energy: 12,
    mood: "Grumpy",
    task: "Repair Toys",
    efficiency: 65,
  },
  {
    id: "E4",
    name: "Sugarplum",
    energy: 95,
    mood: "Energetic",
    task: "Gift Wrapping",
    efficiency: 98,
  },
];
