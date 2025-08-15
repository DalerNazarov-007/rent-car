import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Rating } from '../../ratings/entities/rating.entity';
import { User } from '../../users/entities/user.entity';
import { RentalHistory } from 'src/rental-history/entities/rental-history.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  brand: string;

  @Column({ length: 100 })
  model: string;

  @Column({ length: 20 })
  year: string;

  @Column({ length: 20 })
  licensePlate: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ length: 50, nullable: true })
  color: string;

  @Column({ length: 20, nullable: true })
  fuelType: string;

  @Column({ type: 'int', nullable: true })
  mileage: number;

  @Column()
  categoryId: number;

  @Column()
  ownerId: number;

  @ManyToOne(() => Category, category => category.cars)
  category: Category;

  @ManyToOne(() => User, user => user.cars)
  owner: User;

 @OneToMany(() => RentalHistory, rentalHistory => rentalHistory.car)
  rentalHistories: RentalHistory[];

  @OneToMany(() => Rating, rating => rating.car)
  ratings: Rating[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
