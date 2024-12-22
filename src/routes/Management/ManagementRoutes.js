const ipAddress = "192.168.18.102";
// For Customer
export const getAllUsers = async() => {
    try {
        return await fetch(`http://${ipAddress}:8000/getUsersForAdmin/`)
        .then((response) => {
            if (!response.ok) {
            throw new Error("Network working failed");
            }
            return response.json();
        })
        .then((data) => {
            return data;
        });
    } catch (error) {
        console.error("Error while fetching data: ", error);
    }
};

export const removeUser = async(userId) => {
    try {
        return await fetch(`http://${ipAddress}:8000/deleteUserForAdmin/${userId}/`, {
            method: 'DELETE'
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error("Network working failed");
            }
            return response.json();
        })
        .then((data) => {
            return data;
        });
    } catch (error) {
        console.error("Error while deleting data: ", error);
    }
};

// For Product
export const getAllProduct = async() => {
    try {
        return await fetch(`http://${ipAddress}:8000/getFishesForAdmin/`)
        .then((response) => {
            if (!response.ok) {
            throw new Error("Network working failed");
            }
            return response.json();
        })
        .then((data) => {
            return data;
        });
    } catch (error) {
        console.error("Error while fetching data: ", error);
    }
};

export const removeProduct = async(fishId) => {
    try {
        return await fetch(`http://${ipAddress}:8000/deleteFishForAdmin/${fishId}/`, {
            method: 'DELETE'
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error("Network working failed");
            }
            return response.json();
        })
        .then((data) => {
            return data;
        });
    } catch (error) {
        console.error("Error while deleting data: ", error);
    }
};