import { Repository, UpdateResult } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Stock } from '../entities/Stock';

interface IStockRepo {
	save: (stock: Partial<Stock>) => Promise<Stock>;
	all: () => Promise<Stock[]>;
	findOne: (payload: object) => Promise<Stock>;
	update: (id: string, payload: Partial<Stock>) => Promise<UpdateResult>;
}

class StockRepo implements IStockRepo {
	private ormRepo: Repository<Stock>;

	constructor() {
		this.ormRepo = AppDataSource.getRepository(Stock);
	}

	save = async (stock: Partial<Stock>) => {
		return await this.ormRepo.save(stock);
	};

	all = async () => {
		return await this.ormRepo.find();
	};

	findOne = async (payload: object) => {
		return await this.ormRepo.findOneBy({ ...payload });
	};

	update = async (stockId: string, payload: Partial<Stock>) => {
		return await this.ormRepo.update(stockId, { ...payload });
	};
}

export default new StockRepo();
