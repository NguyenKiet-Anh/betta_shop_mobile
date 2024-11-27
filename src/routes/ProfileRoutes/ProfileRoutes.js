const ipAddress = '192.168.153.102';
// For getting user's data
export const getUserInfo = async(userId) => {
    try {
        return await fetch(`http://${ipAddress}:8000/getUser/${userId}/`)
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
export const updateUserInfo = async(userId, item) => {
    try {        
        return await fetch(`http://${ipAddress}:8000/updateUser/${userId}/`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'full_name': item.userName,
                'phone_number': item.phoneNumber,
                'district_code': item.districtCode,
                'address': item.address,
                'accountName': item.accountName
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network working failed');
            };
            return response.json()
        })
        .then(data => {
            return data;
        })
    } catch (error) {
        console.error("Error updating profile: ", error);
    }
};
// For change password
export const changePassword = async(userId, newPassword) => {
    try {
        return await fetch(`http://${ipAddress}:8000/changePassword/${userId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'new_password': newPassword
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network working failed");
            };
            return response.json();
        })
        .then(data => {
            return data;
        })
    } catch (error) {
        console.error("Error changing account password: ", error);
    }
};

// Get all districts
export const getAllDistricts = async() => {
    try {
        return await fetch(`http://${ipAddress}:8000/getAllDistricts/`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network working failed");
            };
            return response.json();
        })
        .then(data => {
            return data;
        })
    } catch(error) {
        console.error("Error fetching data: ", error);
    }
}