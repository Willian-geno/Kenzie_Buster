import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToOne,
	JoinColumn,
	OneToMany,
} from 'typeorm';
import { Cart } from './Cart';
import { Stock } from './Stock';

@Entity('dvd')
export class Dvd {
	@PrimaryGeneratedColumn('uuid')
	dvdId?: string;

	@Column({ nullable: false })
	name: string;

	@Column({ nullable: false })
	duration: string;

	@OneToOne(() => Stock, { eager: true })
	@JoinColumn()
	stock: Stock;

	@OneToMany(() => Cart, (cart) => cart.dvd, {lazy:true})
	@JoinColumn()
	cart: Cart[];
}
