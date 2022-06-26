import { compare } from 'bcrypt';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn,
	OneToMany,
} from 'typeorm';
import { Cart } from './Cart';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	userId?: string;

	@Column({ nullable: false })
	name: string;

	@Column({ nullable: false, unique: true })
	email: string;

	@Column({ nullable: false })
	password: string;

	@Column({ nullable: false })
	isAdm: boolean;

	@OneToMany(() => Cart, (cart) => cart.user)
	@JoinColumn()
	cart: Cart;

	comparePwd = async (pwdString: string): Promise<boolean> => {
		return await compare(pwdString, this.password);
	};
}
