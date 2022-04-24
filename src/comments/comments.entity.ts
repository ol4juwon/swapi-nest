import { MaxLength, MinLength } from 'class-validator';
import { timestamp } from 'rxjs';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Comments extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @MinLength(1)
  film_id: number;

  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  timestamp: string;

  @Column()
  @MaxLength(500)
  content: string;
}
