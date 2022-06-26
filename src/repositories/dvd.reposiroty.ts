import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Dvd } from "../entities/Dvd";

interface IDvdRepo {
    save: (dvd: Partial<Dvd>) => Promise<Dvd>;
    all: () => Promise<Dvd[]>;
    findOne: (payload: object) => Promise<Dvd>;
}

class DvdRepo implements IDvdRepo {
    private ormRepo: Repository<Dvd>;

    constructor() {
        this.ormRepo = AppDataSource.getRepository(Dvd);
    }

    save = async (dvd: Partial<Dvd>) => {
        return await this.ormRepo.save(dvd);
    };

    all = async () => {
        return await this.ormRepo.find();
    };

    findOne = async (payload: object) => {
        return await this.ormRepo.findOneBy({ ...payload });
    };
}

export default new DvdRepo();
