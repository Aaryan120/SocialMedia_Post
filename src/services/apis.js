const BASE_URL = process.env.REACT_APP_BASE_URL


export const userEndpoints = {
    USER_SUBMISSION_API : BASE_URL + '/user/add'
}
    


export const adminEndpoints = {
    ADMIN_DASHBOARD_API : BASE_URL + '/admin/dashboard',
    ADMIN_LOGIN_API : BASE_URL + '/admin/login'
}