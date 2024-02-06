import fs from 'fs';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import path from 'path';

import { MoveInfo } from '@/types/MoveInfo';

const moveInfo = async (req: NextApiRequest, res: NextApiResponse<MoveInfo[] | { error: string }>) => {
    const filePath = path.join(process.cwd(), 'public/docs_moves.json');

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const jsonData: MoveInfo[] = JSON.parse(fileContent);
        res.status(200).json(jsonData);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
export default moveInfo;