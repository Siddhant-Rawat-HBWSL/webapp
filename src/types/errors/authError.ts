class AuthError extends Error {
        type: string
        constructor(message: string, type: string) {
            super(message)
            this.type = type
        }
    }

    export default AuthError;