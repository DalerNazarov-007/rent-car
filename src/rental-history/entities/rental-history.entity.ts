import { Car } from 'src/cars/entities/car.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class RentalHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  carId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Car, car => car.rentalHistories)
  car: Car;

  @ManyToOne(() => User, user => user.rentalHistories)
  user: User;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
