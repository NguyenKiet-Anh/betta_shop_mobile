// For Customer
export const getAllUsers = async (ipAddress) => {
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

export const removeUser = async (ipAddress, userId) => {
  try {
    return await fetch(
      `http://${ipAddress}:8000/deleteUserForAdmin/${userId}/`,
      {
        method: "DELETE",
      }
    )
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
export const getAllProduct = async (ipAddress) => {
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

export const removeProduct = async (ipAddress, fishId) => {
  try {
    return await fetch(
      `http://${ipAddress}:8000/deleteFishForAdmin/${fishId}/`,
      {
        method: "DELETE",
      }
    )
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
