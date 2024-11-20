// For getting
// For getting all fishes
export const getAllFishes = async() => {
    try {
        return await fetch(`http://127.0.0.1:8000/getFishes`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");                
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error("Error fetching data");
            throw error;
        })
    } catch (error) {
        console.error("Error fetching data");
    }
};

// For getting all fishes in promotion
export const getAllFishesPromotion = async() => {
    try {
        return await fetch(`http://127.0.0.1:8000/getFishesPromotion`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error("Error fetching data");
            throw error;
        })
    } catch (error) {
        console.error("Error fetching data");
    }
}

// For getting all categories
export const getAllCategories = async() => {
    try {
        return await fetch(`http://127.0.0.1:8000/getCategories`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");                
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error("Error fetching data");
            throw error;
        })
    } catch (error) {
        console.error("Error fetching data");
    }
};

// For getting fishesby their category
export const getFishesByCategory = async() => {
    try {
        return await fetch(`http://127.0.0.1:8000/getFishesByCategory`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error("Error fetching data");
            throw error;
        })
    } catch (error) {
        console.error("Error fetching data");
    }
}

