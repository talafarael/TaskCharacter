export class CreateStatsRepoDto {
  gold: number = 0;
  experience: number = 0;
  level: number = 1;
  strength: number = 10;
  agility: number = 10;
  intelligence: number = 10;
  characterId: Object;
  constructor(characterId: string, partial?: Partial<CreateStatsDto>) {
    if (!characterId) {
      throw new Error('characterId is required');
    }
    if (partial) {
      Object.assign(this, {
        ...partial,
        characterId: new Object(characterId),
      });
    }
  }
}

export class CreateStatsDto {
  gold: number;
  experience: number;
  level: number;
  strength: number;
  agility: number;
  intelligence: number;
  characterId: string;
}
