import { Cart } from "../entities/Cart";
import { Dvd } from "../entities/Dvd";
import { User } from "../entities/User";

declare global {
    namespace Express {
        interface Request {
            validated: User;
            decoded: User;
            user: User;
            cart: Cart
            dvd: Dvd;
        }
    }
}
