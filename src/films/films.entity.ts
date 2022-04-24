import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  episode_id: number;
  @Column()
  opening_crawl: string;

  @Column()
  comment_count: number;

  @Column()
  producer: string;

  @Column()
  release_date: string;

  @Column()
  director: string;

  //   @Column()
  //   vehicles: string[];

  //   @Column()
  //   starships: string[];

  //   @Column()
  //   characters: string[];

  //   @Column()
  //   planets: string[];

  @Column()
  url: string;

  @Column()
  created: string;

  @Column()
  edited: string;
}
