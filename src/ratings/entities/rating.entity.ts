import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { Car } from 'src/cars/entities/car.entity';
import { User } from 'src/users/entities/user.entity';


@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text', nullable: true })
  review: string;

  @Column()
  userId: number;

  @Column()
  carId: number;

  @ManyToOne(() => User, user => user.ratings)
  user: User;

  @ManyToOne(() => Car, car => car.ratings)
  car: Car;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
