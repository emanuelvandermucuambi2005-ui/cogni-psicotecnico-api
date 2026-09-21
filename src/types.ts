export type CategoryId =
  | "numerical" | "verbal" | "abstract" | "logic" | "attention"
  | "spatial" | "memory" | "speed" | "sequences" | "mixed";

export type Difficulty = 1|2|3|4|5|6|7|8|9|10;

export interface Question {
  id:string;
  category:CategoryId;
  level:number;
  difficulty:Difficulty;
  type:"multiple_choice"|"true_false";
  prompt:string;
  options:string[];
  answer:string;
  explanation:string;
  timeLimitSec:number;
  xp:number;
  tags:string[];
}

export interface TestDefinition {
  id:string;
  title:string;
  category:CategoryId;
  level:number;
  durationSec:number;
  questionCount:number;
  questionIds:string[];
  mode:"practice"|"timed"|"mock"|"mixed";
}

export interface Session {
  id:string;
  userId:string;
  testId:string;
  startedAt:string;
  questionIds:string[];
  currentIndex:number;
  score:number;
  xp:number;
  correct:number;
  answered:number;
  streak:number;
  bestStreak:number;
  finished:boolean;
}