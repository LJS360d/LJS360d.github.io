export interface EvolutionInfo extends EvolutionTree {
  old: EvolutionTree | null;
}

export interface EvolutionTree {
  family: number;
  evolutions: EvolutionPath[];
}

export interface EvolutionPath {
  from: number;
  to: EvolutionOutcome[];
}

export interface EvolutionOutcome {
  species: number;
  methods: EvolutionMethod[];
}

export interface EvolutionMethod {
  method: number;
  clause: number;
}
