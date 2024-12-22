const ipAddress = "192.168.18.102";
// For getting - GET method
export const getReviewByFishId = async (id) => {
  try {
    return await fetch(`http://${ipAddress}:8000/getReview/${id}`)
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
