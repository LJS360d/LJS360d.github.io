import {
  useEffect,
  useState,
} from 'react';

import { MoveInfo } from '@/types/MoveInfo';
import { PokemonInfo } from '@/types/PokemonInfo';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Button,
  Drawer,
  IconButton,
  Typography,
} from '@mui/material';

import MoveInfoComponent from './components/MoveInfoComponent';
import PokemonInfoComponent from './components/PokemonInfoComponent';

type Endpoints = "movesInfo" | "pokemonInfo" | "abilitiesInfo";
type DocsTypes = PokemonInfo[] | MoveInfo[];
export default function Home() {
  const [docsType, setDocsType] = useState<Endpoints | null>(null);
  const [docsData, setDocsData] = useState<DocsTypes | null>(null);
  const [drawerState, setDrawerState] = useState(false);
  const drawerItems = [
    { label: "Pokèmon", endpoint: "pokemonInfo" },
    { label: "Moves", endpoint: "movesInfo" },
    { label: "Abilities", endpoint: "abilitiesInfo" },
  ] as const;
  useEffect(() => {
    renderEndpoint("pokemonInfo");
  }, []);

  async function renderEndpoint(endpoint: Endpoints) {
    setDocsData(null);
    setDrawerState(false);

    try {
      const response = await fetch(`/api/${endpoint}`);
      const data: DocsTypes = await response.json();
      setDocsType(endpoint);
      setDocsData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <main>
      <header className="nav">
        <IconButton
          onClick={() => {
            setDrawerState(true);
          }}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" fontWeight={"bold"} color={"white"}>
          Placeholder
        </Typography>
      </header>
      <ul>
        {docsData ? (
          docsData.map((doc, i) => {
            switch (docsType) {
              case "pokemonInfo":
                return <PokemonInfoComponent key={i} entry={doc as PokemonInfo} />;
              case "movesInfo":
                return <MoveInfoComponent key={i} entry={doc as MoveInfo} />;
              /* case "abilitiesInfo":
                return (
                  <AbilityInfoComponent key={i} entry={doc as AbilityInfo} />
                ); */
              default:
                return null;
            }
          })
        ) : (
          <li>Loading Data...</li>
        )}
      </ul>
      <Drawer
        anchor="left"
        open={drawerState}
        onClose={() => setDrawerState(false)}
      >
        <Typography variant="h5" padding="1rem">
          Go to
        </Typography>
        {drawerItems.map((item, index) => (
          <Button key={index} onClick={() => renderEndpoint(item.endpoint)}>
            <Typography padding="1rem">{item.label}</Typography>
          </Button>
        ))}
      </Drawer>
    </main>
  );
}
