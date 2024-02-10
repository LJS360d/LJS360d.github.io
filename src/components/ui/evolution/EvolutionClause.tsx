import Clause from './clauses/clauses';

interface EvolutionClauseProps {
  oldClause: string[] | null;
  newClause: string[];
  i: number;
}

function EvolutionClause({ oldClause, newClause, i }: EvolutionClauseProps) {
  return (
    <div className='flex flex-col justify-end relative'>
      {oldClause?.length && newClause[i] !== oldClause[i] ? (
        <>
          <span className='text-xl absolute bottom-6 old'>
            <Clause clause={oldClause[i]} />
          </span>
          <span className='text-xl new'>
            <Clause clause={newClause[i]} />
          </span>
        </>
      ) : (
        <span className='text-xl'>
          <Clause clause={newClause[i]} />
        </span>
      )}
    </div>
  );
}
export default EvolutionClause;
