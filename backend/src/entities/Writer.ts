import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import AccountStatus from './AccountStatus';
import { Book } from './Book';

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

  @OneToMany(() => Book, book => book.writer, {
    cascade: true
  })
  books: Book[];

  @Column({ type: 'enum', enum: AccountStatus, default: AccountStatus.NOT_ACTIVATED })
  status: AccountStatus;

  @Column('text', { array: true, default: {} })
  favoriteGenres: string[];

  constructor(writer?: {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    favoriteGenres: string[];
  }) {
    super();
    if (writer) {
      this.firstName = writer.firstName;
      this.lastName = writer.lastName;
      this.username = writer.username;
      this.password = writer.password;
      this.email = writer.email;
      this.status = AccountStatus.NOT_ACTIVATED;
      this.favoriteGenres = writer.favoriteGenres;
    }
  }
}
