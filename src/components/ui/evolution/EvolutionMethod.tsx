import { EvolutionMethods } from "../../../models/static/records";

interface EvolutionMethodProps {
  oldMethod: string[] | null;
  newMethod: string[];
  i: number;
}

export default function EvolutionMethod({
  oldMethod,
  newMethod,
  i,
}: EvolutionMethodProps) {
  return (
    <div className="flex flex-col justify-end">
      {oldMethod?.length && newMethod[i] !== oldMethod[i] ? (
        <>
          <span className="text-xl absolute bottom-6 old">
            {EvolutionMethods[oldMethod[i]] ?? oldMethod[i]}
          </span>
          <span className="text-xl new">
            {EvolutionMethods[newMethod[i]] ?? newMethod[i]}
          </span>
        </>
      ) : (
        <span className="text-xl">
          {EvolutionMethods[newMethod[i]] ?? newMethod[i]}
        </span>
      )}
    </div>
  );
}
