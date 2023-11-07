import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  gv_id: string;

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
}
