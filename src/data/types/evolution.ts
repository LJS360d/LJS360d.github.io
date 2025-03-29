export interface EvolutionTree {
  family: number;
  evolutions: EvolutionPath[];
  old: Omit <EvolutionTree, "old"> | null;
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
