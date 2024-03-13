import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  title: string = "";

  @Column()
  description: string = "";

  @Column()
  thumbnail: string = "";

  @Column()
  seats: number = 0;

  @Column()
  price: number = 0;

  @Column()
  date: Date = new Date();
}
