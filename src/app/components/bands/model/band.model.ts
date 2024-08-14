import { RegisteredUser } from "../../user/model/registered-user.model";
import { Genre } from "./genre.model";

export interface Band {
    id: number,
    name: string,
    description: string,
    type: string,
    genres: Genre[],
    owner: RegisteredUser
}