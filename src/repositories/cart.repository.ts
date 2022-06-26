import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Cart } from "../entities/Cart";

interface ICartRepo {
    save: (cart: Partial<Cart>) => Promise<Cart>;
    all: () => Promise<Cart[]>;
    findOne: (payload: object) => Promise<Cart>;
    update: (id: string, payload: Partial<Cart>) => Promise<UpdateResult>;

}

class CartRepo implements ICartRepo {
    private ormRepo: Repository<Cart>;

    constructor() {
        this.ormRepo = AppDataSource.getRepository(Cart);
    }

    save = async (cart:Cart) => {
         const newcar = this.ormRepo.create(cart);
         return this.ormRepo.save(newcar)

    };

    all = async () => {
        return await this.ormRepo.find({relations:{dvd:true}});
    };

    findOne = async (payload: object) => {
        return await this.ormRepo.findOneBy({ ...payload });
    };

    update = async (cartId: string, payload: Partial<Cart>) => {
        return await this.ormRepo.update(cartId, { ...payload });
    };

}


export default new CartRepo();
