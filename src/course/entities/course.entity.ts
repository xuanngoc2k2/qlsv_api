import { Score } from 'src/score/entities/score.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  gv: string;

  @Column()
  so_tc: string;

  @Column()
  from: number;

  @Column()
  to: number;

  @Column()
  date: string;

  @Column()
  year: string;

  @Column()
  hocKi: string;

  @Column()
  totalSV: string;

  @Column()
  address: string;

  @Column()
  desc: string;

  @Column({ nullable: true, default: 0 })
  isDel: number;

  @OneToMany(() => Score, (score) => score.course)
  scores: Score[];
}
