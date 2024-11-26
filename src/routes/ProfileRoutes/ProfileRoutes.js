const ipAddress = '192.168.153.102';
// For getting user's data
export const getUserInfo = async(userId) => {
    try {
        return await fetch(`http://${ipAddress}:8000/getUser/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network working failed')
            };
            return response.json()
        })
        .then(data => {
            return data;
        })
    } catch (error) {
        console.error("Error fetching user info: ", error);
    }
};
// For editing information
export const updateUserInfo = async() => {

};
// For change password
export const changePassword = async() => {
    try {
        return await fetch(`http://${ipAddress}:8000/`)
    } catch (error) {
        console.error("Error changing account password: ", error);
    }
};