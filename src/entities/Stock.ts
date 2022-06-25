import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";


@Entity("stock")
export class stock {
  @PrimaryGeneratedColumn("uuid")
  stockId?: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

}
