import {
  useEffect,
  useState,
} from 'react';

import { PokemonInfo } from '@/types/PokemonInfo';

import PokemonInfoComponent from './components/mon';

export default function Home() {
  const [docsData, setDocsData] = useState<PokemonInfo[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/docs");
        const data: PokemonInfo[] = await response.json();
        setDocsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <ul>
      {docsData ? (
        docsData.map((doc, index) => (
          <PokemonInfoComponent key={index} entry={doc} />
        ))
      ) : (
        <li>Loading data...</li>
      )}
    </ul>
  );
}
