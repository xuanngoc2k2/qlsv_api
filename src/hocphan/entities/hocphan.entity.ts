import { Mon } from 'src/mon/entities/mon.entity';
import { SinhvienHocphan } from 'src/sinhvienhocphan/entities/sinhvienhocphan.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hocphan {
  @PrimaryGeneratedColumn()
  mahocphan: number;

  @PrimaryColumn()
  thutu: number;

  @Column({ nullable: false })
  nam: number;

  @Column({ nullable: false })
  hocki: number;

  @Column({ nullable: false })
  diadiemhoc: string;

  @Column({ nullable: false })
  soluong: number;

  @Column({ nullable: false })
  gvphutrach: string;

  @ManyToOne(() => Mon, (mon) => mon.hocphans)
  @JoinColumn({ name: 'mamon' })
  mon: Mon;

  @OneToMany(() => SinhvienHocphan, (svhp) => svhp.hp)
  svhp: SinhvienHocphan[]

}
