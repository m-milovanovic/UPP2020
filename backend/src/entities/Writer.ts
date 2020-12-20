import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import AccountStatus from './AccountStatus';

@Entity()
export class Writer extends BaseEntity {
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

  @Column('text', { array: true, default: {} })
  files: string[];

  @Column({ type: 'enum', enum: AccountStatus, default: AccountStatus.NOT_ACTIVATED })
  status: AccountStatus;

  constructor(writer?: {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    files: string[]
  }) {
    super();
    if (writer) {
      this.firstName = writer.firstName;
      this.lastName = writer.lastName;
      this.username = writer.username;
      this.password = writer.password;
      this.email = writer.email;
      this.status = AccountStatus.NOT_ACTIVATED;
    }
  }
}
