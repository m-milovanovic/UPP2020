import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import AccountStatus from './AccountStatus';

@Entity()
export class Reader extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  beta: boolean;

  @Column('text', { array: true, default: {} })
  favoriteGenres: string[];

  @Column('text', { array: true, default: {} })
  betaGenres?: string[];

  @Column({ type: 'enum', enum: AccountStatus, default: AccountStatus.NOT_ACTIVATED })
  status: AccountStatus;

  @Column({ default: 0 })
  penaltyPoints: number;

  constructor(reader?: {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    favoriteGenres: string[];
    genres?: string[];
    beta: boolean;
  }) {
    super();
    if (reader) {
      this.firstName = reader.firstName;
      this.lastName = reader.lastName;
      this.username = reader.username;
      this.password = reader.password;
      this.email = reader.email;
      this.favoriteGenres = reader.favoriteGenres;
      this.beta = reader.beta;
      if (this.beta) {
        this.betaGenres = reader.genres;
      }
      this.status = AccountStatus.NOT_ACTIVATED;
      this.penaltyPoints = 0
    }
  }
}
