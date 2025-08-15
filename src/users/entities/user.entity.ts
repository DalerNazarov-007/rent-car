import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRole } from '../../common/enums/user-role.enum';
import { Rating } from '../../ratings/entities/rating.entity';
import { Car } from '../../cars/entities/car.entity';
import { RentalHistory } from 'src/rental-history/entities/rental-history.entity';

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
