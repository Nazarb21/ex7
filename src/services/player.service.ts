import { getRepository } from 'typeorm';
import { Player } from '../entities/player.entity';

export class PlayerService {
    private playerRepository = getRepository(Player);

    async getAllPlayers() {
        return this.playerRepository.find({ relations: ['team'] });
    }

    async getPlayerById(id: number) {
        return this.playerRepository.findOne(id, { relations: ['team'] });
    }

    async createPlayer(player: Player) {
        return this.playerRepository.save(player);
    }

    async updatePlayer(id: number, player: Partial<Player>) {
        await this.playerRepository.update(id, player);
        return this.getPlayerById(id);
    }

    async deletePlayer(id: number) {
        return this.playerRepository.delete(id);
    }

    async transferPlayer(playerId: number, newTeamId: number) {
        const player = await this.getPlayerById(playerId);
        const newTeam = await getRepository(Team).findOne(newTeamId);
        const oldTeam = player.team;

        if (player && newTeam && oldTeam) {
            const age = (new Date()).getFullYear() - player.careerStartDate.getFullYear();
            const transferFee = 100000 / age;
            const commission = transferFee * newTeam.commission / 100;
            const totalAmount = transferFee + commission;

            if (newTeam.balance >= totalAmount) {
                newTeam.balance -= totalAmount;
                oldTeam.balance += totalAmount;

                player.team = newTeam;

                await this.playerRepository.save(player);
                await getRepository(Team).save(newTeam);
                await getRepository(Team).save(oldTeam);

                return player;
            } else {
                throw new Error('Insufficient funds');
            }
        } else {
            throw new Error('Invalid player or team');
        }
    }
}
