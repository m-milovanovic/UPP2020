import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BoardMember extends BaseEntity {
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

  constructor(boardMember?: {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
  }) {
    super();
    if (boardMember) {
      this.firstName = boardMember.firstName;
      this.lastName = boardMember.lastName;
      this.username = boardMember.username;
      this.password = boardMember.password;
      this.email = boardMember.email;
    }
  }
}
