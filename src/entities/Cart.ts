import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Dvd } from "./Dvd";
import { User } from "./User";

@Entity("carts")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  carId?: string;

  @Column({ nullable: false })
  paid: boolean;

  @Column({ nullable: false })
  total: number;

	@OneToOne(() => Cart)
	@JoinColumn()
	user: User;

  @OneToMany(() => Dvd, (dvd) => dvd.car, {eager:true})
  rent: Dvd[];
}
