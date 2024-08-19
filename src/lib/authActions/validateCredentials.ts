export function validateCredentials(username : string, password : string) {
    return validateUsername(username) && validatePassword(password);
}

function validateUsername(username : string) {
    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
    return usernamePattern.test(username);
}

function validatePassword(password : string) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordPattern.test(password);
}
