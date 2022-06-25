import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Cart } from "./Cart";

@Entity("dvd")
export class Dvd {
  @PrimaryGeneratedColumn("uuid")
  dvdId?: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  duration: string;

  @ManyToOne(() => Cart, (cart) => cart.rent)
  car: Cart;

}
