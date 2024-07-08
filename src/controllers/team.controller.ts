import { Request, Response, Router } from 'express';
import { TeamService } from '../services/team.service';

const teamService = new TeamService();
const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    const teams = await teamService.getAllTeams();
    res.json(teams);
});

router.get('/:id', async (req: Request, res: Response) => {
    const team = await teamService.getTeamById(parseInt(req.params.id));
    res.json(team);
});

router.post('/', async (req: Request, res: Response) => {
    const team = await teamService.createTeam(req.body);
    res.json(team);
});

router.put('/:id', async (req: Request, res: Response) => {
    const team = await teamService.updateTeam(parseInt(req.params.id), req.body);
    res.json(team);
});

router.delete('/:id', async (req: Request, res: Response) => {
    await teamService.deleteTeam(parseInt(req.params.id));
    res.sendStatus(204);
});

export const teamController = router;
