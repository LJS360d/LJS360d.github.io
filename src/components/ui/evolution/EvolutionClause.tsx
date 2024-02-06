interface EvolutionClauseProps {
  oldClause: string[] | null;
  newClause: string[];
  i: number;
}

function EvolutionClause({ oldClause, newClause, i }: EvolutionClauseProps) {
  return (
    <div className="flex flex-col justify-end relative">
      {oldClause?.length && newClause[i] !== oldClause[i] ? (
        <>
          <span className="text-xl absolute bottom-6 old">{oldClause[i]}</span>
          <span className="text-xl new">{newClause[i]}</span>
        </>
      ) : (
        <span className="text-xl">{newClause[i]}</span>
      )}
    </div>
  );
}
export default EvolutionClause;
