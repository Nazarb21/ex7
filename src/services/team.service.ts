import { getRepository } from 'typeorm';
import { Team } from '../entities/team.entity';

export class TeamService {
    private teamRepository = getRepository(Team);

    async getAllTeams() {
        return this.teamRepository.find();
    }

    async getTeamById(id: number) {
        return this.teamRepository.findOne(id);
    }

    async createTeam(team: Team) {
        return this.teamRepository.save(team);
    }

    async updateTeam(id: number, team: Partial<Team>) {
        await this.teamRepository.update(id, team);
        return this.getTeamById(id);
    }

    async deleteTeam(id: number) {
        return this.teamRepository.delete(id);
    }
}
