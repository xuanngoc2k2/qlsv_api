import { Mon } from 'src/mon/entities/mon.entity';
import { SinhvienHocphan } from 'src/sinhvienhocphan/entities/sinhvienhocphan.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hocphan {
  // @PrimaryGeneratedColumn()
  // mahocphan: number;
  @PrimaryColumn()
  // @Column({ nullable: false })
  mahocphan: string;

  // @PrimaryColumn()
  // @Column({ nullable: false })
  // mamon: number;

  // @Column({ nullable: false })
  @PrimaryColumn()
  thutu: number;

  @Column({ nullable: false })
  nam: string;

  @Column({ nullable: false })
  tenhp: string;

  @Column({ nullable: false })
  hocki: number;

  @Column({ nullable: false })
  diadiemhoc: string;

  @Column({ nullable: false })
  soluong: number;

  @Column({ nullable: false })
  gvphutrach: string;

  @Column({ nullable: false })
  tutiet: string;

  @Column({ nullable: false })
  dentiet: string;

  @Column({ nullable: false })
  mota: string;

  @ManyToOne(() => Mon, (mon) => mon.hocphans)
  @JoinColumn({ name: 'mamon' })
  mon: Mon;

  @OneToMany(() => SinhvienHocphan, (svhp) => svhp.hp)
  svhp: SinhvienHocphan[]

}
