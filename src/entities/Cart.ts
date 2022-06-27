import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
	OneToOne,
	JoinColumn,
} from 'typeorm';
import { Dvd } from './Dvd';
import { User } from './User';

@Entity('carts')
export class Cart {
	@PrimaryGeneratedColumn('uuid')
	carId?: string;

	@Column({ nullable: false })
	paid: boolean;

	@Column({ nullable: false, type: 'float' })
	total: number;

	@ManyToOne(() => User, (user) => user.cart, {
		lazy: true,
		eager: true,
	})
	@JoinColumn()
	user: User;

	@ManyToOne(() => Dvd, (dvd) => dvd.cart, {eager:true})
	@JoinColumn()
	dvd: Dvd;
}
