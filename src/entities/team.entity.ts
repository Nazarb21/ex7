import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Player } from './player.entity';

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    balance: number;

    @Column('decimal', { precision: 5, scale: 2, default: 0 })
    commission: number;

    @OneToMany(() => Player, player => player.team)
    players: Player[];
}
