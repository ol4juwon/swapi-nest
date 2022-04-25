import {
  IsIP,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Comments extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  username: string;

  @Column()
  @MinLength(1)
  @IsPositive()
  @IsNumber()
  film_id: number;

  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  timestamp: string;

  @Column()
  @MaxLength(500)
  @IsNotEmpty()
  content: string;

  @Column()
  @IsIP()
  ip_address: string;
}
