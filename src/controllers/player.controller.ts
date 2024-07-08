import { Request, Response, Router } from 'express';
import { PlayerService } from '../services/player.service';

const playerService = new PlayerService();
const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    const players = await playerService.getAllPlayers();
    res.json(players);
});

router.get('/:id', async (req: Request, res: Response) => {
    const player = await playerService.getPlayerById(parseInt(req.params.id));
    res.json(player);
});

router.post('/', async (req: Request, res: Response) => {
    const player = await playerService.createPlayer(req.body);
    res.json(player);
});

router.put('/:id', async (req: Request, res: Response) => {
    const player = await playerService.updatePlayer(parseInt(req.params.id), req.body);
    res.json(player);
});

router.delete('/:id', async (req: Request, res: Response) => {
    await playerService.deletePlayer(parseInt(req.params.id));
    res.sendStatus(204);
});

router.post('/:id/transfer/:newTeamId', async (req: Request, res: Response) => {
    try {
        const player = await playerService.transferPlayer(parseInt(req.params.id), parseInt(req.params.newTeamId));
        res.json(player);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export const playerController = router;
