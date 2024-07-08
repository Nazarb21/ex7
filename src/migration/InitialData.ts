import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { Player } from '../entities/player.entity';

export class InitialData1627819539741 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const teamRepository = getRepository(Team);
        const playerRepository = getRepository(Player);

        const team1 = teamRepository.create({
            name: 'Team A',
            city: 'City A',
            country: 'Country A',
            balance: 1000000,
            commission: 5
        });
        const team2 = teamRepository.create({
            name: 'Team B',
            city: 'City B',
            country: 'Country B',
            balance: 1500000,
            commission: 3
        });

        await teamRepository.save([team1, team2]);

        const player1 = playerRepository.create({
            firstName: 'John',
            lastName: 'Doe',
            careerStartDate: new Date('2010-01-01'),
            team: team1
        });
        const player2 = playerRepository.create({
            firstName: 'Jane',
            lastName: 'Smith',
            careerStartDate: new Date('2012-05-15'),
            team: team2
        });

        await playerRepository.save([player1, player2]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }
}
