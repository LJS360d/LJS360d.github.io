interface ClauseProps {
  clause: number;
}

export default function ClauseFactory({ clause }: ClauseProps) {
  return <span>{clause}</span>;
}
