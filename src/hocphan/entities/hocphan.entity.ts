import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hocphan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  student_id: number;

  @Column({ nullable: false })
  course_id: number;
}
