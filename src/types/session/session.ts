import { User } from "@prisma/client";

class session {
    user: User
    token: string
    constructor(user: User, token: string) {
        this.user = user
        this.token = token
    }
}