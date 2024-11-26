const ipAddress = '192.168.153.102'
// For getting Cart - GET method
export const getCartById = async(id) => {
    try {
        return await fetch(`http://${ipAddress}:8000/getCart/${id}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network working failed');
            };
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        })
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

// For adding - POST method
export const addFishToCart = async(userId, fishId) => {
    try {
        return await fetch(`http://${ipAddress}:8000/addCart/${userId}/${fishId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'userId': userId,
                'fishId': fishId
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
        .catch(error => {
            console.error("Error posting data: ", error);
        })
    } catch (error) {
        console.error("Error posting data: ", error);
    }
};


// For changing amount of product - PUT method
export const changeAmount = async(userId, action, amount) => {
    try {
        return await fetch(`http://${ipAddress}:8000/updateCart/${userId}/${action}/${amount}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network working failed');
            };
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error("Error updating data: ", error);
        })
    } catch (error) {
        console.error("Error updating data: ", error);
    }
};

// For removing product from cart - DELETE method
export const removeFishFromCart = async(userId, fishId) => {
    try {
        return await fetch(`http://${ipAddress}:8000/removeCart/${userId}/${fishId}/`, {
            method: 'DELETE'
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
        .catch(error => {
            console.error("Error removing data: ", error);
        })
    } catch(error) {
        console.error("Error removing data: ", error);
    }
};

// Deleting all items in cart
export const deleteFishFromCart = async() => {
    try {
        return await fetch(`http://${ipAddress}:8000/deleteCart/${userID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network working failed");
            };
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error("Error deleting data: ", error);
        })
    } catch(error) {
        console.error("Error deleting data: ", error);
    }
};

// For checking out cart - POST method
export const checkOutCart = async(userId) => {
    try {
        return await fetch(`http://${ipAddress}:8000/checkout/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network working failed');
            };
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error("Error checking out: ", error);
        })
    } catch(error) {
        console.error("Error checking out: ", error);
    }
};