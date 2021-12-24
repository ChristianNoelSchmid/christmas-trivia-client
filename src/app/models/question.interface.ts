export interface Question {
  index: number;
  title: string;
  message: string;
  type: string;
  choices: string[] | undefined;
}
