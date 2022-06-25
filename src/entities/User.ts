import { compare } from 'bcrypt';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn,
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

	comparePwd = async (pwdString: string): Promise<boolean> => {
		return await compare(pwdString, this.password);
	};
}
