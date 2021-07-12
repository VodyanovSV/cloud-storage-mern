export const registrationUser = async (email, password) => {
    try {
        const body = JSON.stringify({email, password})
        const headers = {'Content-Type': 'application/json'}
        const url = '/api/auth/register'
        const response = await fetch(url, {method: 'POST', body, headers})
        const data = await response.json()
        alert(data.message)
    } catch (e) {
        alert(e.message)
    }
}