import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import StaffRole from './StaffRole';

@Entity()
export class Staff extends BaseEntity {
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

  @Column({ type: 'enum', enum: StaffRole})
  role: StaffRole;

  constructor(staff?: {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    role: StaffRole;
  }) {
    super();
    if (staff) {
      this.firstName = staff.firstName;
      this.lastName = staff.lastName;
      this.username = staff.username;
      this.password = staff.password;
      this.email = staff.email;
      this.role = staff.role;
    }
  }
}
