import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  course_id: number;

  @Column()
  student_id: number;

  @Column()
  middle: number;

  @Column()
  final: number;

  @Column()
  updateAt: Date;
}
