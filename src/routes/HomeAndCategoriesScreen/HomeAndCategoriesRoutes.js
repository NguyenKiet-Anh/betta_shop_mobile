// For Home
// For getting all fishes in both promotion and non-promotion
export const getAllFishesAll = async (ipAddress) => {
  try {
    return await fetch(`http://${ipAddress}:8000/getFishesAll`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error fetching data");
        throw error;
      });
  } catch (error) {
    console.error("Error fetching data");
  }
};

// For getting all fishes
export const getAllFishes = async (ipAddress) => {
  try {
    return await fetch(`http://${ipAddress}:8000/getFishes`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error fetching data");
        throw error;
      });
  } catch (error) {
    console.error("Error fetching data");
  }
};

// For getting all fishes in promotion
export const getAllFishesPromotion = async (ipAddress) => {
  try {
    return await fetch(`http://${ipAddress}:8000/getFishesPromotion`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error fetching data");
        throw error;
      });
  } catch (error) {
    console.error("Error fetching data");
  }
};

// For getting all categories
export const getAllCategories = async (ipAddress) => {
  try {
    return await fetch(`http://${ipAddress}:8000/getCategories/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error fetching data");
        throw error;
      });
  } catch (error) {
    console.error("Error fetching data");
  }
};

// For Category
// For getting fishes by their category
export const getFishesByCategory = async (ipAddress) => {
  try {
    return await fetch(`http://${ipAddress}:8000/getFishesByCategory`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error fetching data");
        throw error;
      });
  } catch (error) {
    console.error("Error fetching data");
  }
};
