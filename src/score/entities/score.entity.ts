import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  course_id: number;

  @Column()
  student_id: number;

  @Column('double')
  middle: number;

  @Column('double')
  final: number;

  @Column('double')
  total: number;

  @Column()
  updateAt: Date;
}
