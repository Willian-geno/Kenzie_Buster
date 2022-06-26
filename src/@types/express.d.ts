import { Cart } from "../entities/Cart";
import { Dvd } from "../entities/Dvd";
import { Stock } from "../entities/Stock";
import { User } from "../entities/User";

declare global {
    namespace Express {
        interface Request {
            validated: User | Dvd | Stock;
            decoded: User;
            user: User;
            cart: Cart
            dvd: Dvd;
        }
    }
}
