import { Answer } from "./answer.interface";
import { UserToCreature } from "./user-to-creature.interface";

export interface Account {
  password: string;
  name: string;
  toGiftId: number;
  secretSantaGift: string;
  answers: Answer[]
  usersToCreatureRates: UserToCreature[]
}
