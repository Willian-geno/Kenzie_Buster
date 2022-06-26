import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";


@Entity("stock")
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  stockId?: string;

  @Column()
  quantity: number;

  @Column({type: "float"})
  price: number;

}
