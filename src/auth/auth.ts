export const isUserLoggedIn = () => {
    if(typeof window === 'undefined') return false
    return !!sessionStorage.getItem('user');
}