import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ nullable: false })
  fullName!: string;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ nullable: false })
  address!: string;

  @Column({ nullable: false })
  phoneNumber!: string;

  @Column({ nullable: false })
  dateOfBirth!: Date;

  @Column({ nullable: false })
  role!: string;

  @Column({ default: false })
  verifyEmail!: boolean;

  @Column({ nullable: true })
  emailVerificationToken!: string;
}
