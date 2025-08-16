import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { RentalHistory } from 'src/rental-history/entities/rental-history.entity';
import { UserRole } from 'src/common/enums/user-role.enum';
import { Car } from 'src/cars/entities/car.entity';
import { Rating } from 'src/ratings/entities/rating.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  firstname: string;

  @Column({ length: 50 })
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  @OneToMany(() => Car, car => car.owner)
  cars: Car[];

  @OneToMany(() => Rating, rating => rating.user)
  ratings: Rating[];

  @OneToMany(() => RentalHistory, rentalHistory => rentalHistory.user)
  rentalHistories: RentalHistory[];

}
