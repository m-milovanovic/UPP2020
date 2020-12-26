import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('act_id_user', { synchronize: false })
export class CamundaUser extends BaseEntity {
  @PrimaryColumn({ name: 'id_' })
  username: string;
  @Column({ name: 'pwd_' })
  password: string;
  @Column({ name: 'email_' })
  email: string;
}
