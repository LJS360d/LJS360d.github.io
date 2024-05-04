export interface EvolutionInfo extends EvolutionTree {
  old: EvolutionTree | null;
}

export interface EvolutionTree {
  family: string;
  evolutions: EvolutionPath[];
}

export interface EvolutionPath {
  from: string;
  to: EvolutionOutcome[];
}

export interface EvolutionOutcome {
  species: string;
  methods: EvolutionMethod[];
}

export interface EvolutionMethod {
  method: string;
  clause: string;
}
