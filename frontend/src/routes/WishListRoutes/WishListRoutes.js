// Get wishlist by id
export const getWishList = async (ipAddress, id) => {
  try {
    // Get wishlist by userId - MaKhachHang
    return await fetch(`http://${ipAddress}:8000/getWishList/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network working failed");
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  } catch (error) {
    console.error("Error fetching wishlist");
  }
};
// For removing fish from wish list - DELETE method
export const addFishToWishList = async (ipAddress, userId, fishId) => {
  try {
    return await fetch(`http://${ipAddress}:8000/addWishList/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        fishId: fishId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network working failed");
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error posting data: ", error);
      });
  } catch (error) {
    console.error("Error deleting data");
  }
};

// For remove item from wishlist
export const removeFishFromWishList = async (ipAddress, userId, fishId) => {
  try {
    return await fetch(
      `http://${ipAddress}:8000/removeWishList/${userId}/${fishId}/`,
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
      })
      .catch((error) => {
        console.error("Error deleting data: ", error);
      });
  } catch (error) {
    console.error("Error deleting data");
  }
};

// Delete all items in wishlist
export const deleteWishList = async (ipAddress, userId) => {
  try {
    return await fetch(`http://${ipAddress}:8000/deleteWishList/${userId}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network working failed");
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error deleting all wishlist: ", error);
      });
  } catch (error) {
    console.error("Error deleting all wishlist");
  }
};
