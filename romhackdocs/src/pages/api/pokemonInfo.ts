import fs from 'fs';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import path from 'path';

import { PokemonInfo } from '@/types/PokemonInfo';

const pokemonInfo = async (req: NextApiRequest, res: NextApiResponse<PokemonInfo[] | { error: string }>) => {
    const filePath = path.join(process.cwd(), 'public/docs_mons.json');

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const jsonData: PokemonInfo[] = JSON.parse(fileContent);
        res.status(200).json(jsonData);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export default pokemonInfo;