import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";

// Import Contexts Here
import { useAuth } from "../context/authContext";

// Import Routes Here
import { getReviewByFishId } from "../routes/ReviewRoutes/ReviewRoutes";
import { getFishById } from "../routes/DetailScreen/DetailRoutes";

export default function Review({ route }) {
  // Variable for user id
  const { userInfo, ipAddress } = useAuth();
  // Variable for fish id
  const { itemId } = route.params;
  // Variables for review page
  const [review, setReview] = useState([]); // Store review data
  const [fish, setFish] = useState([]); // Store fish data
  const [isLoading, setIsLoading] = useState(true);
  const [visibleReviews, setVisibleReviews] = useState(5); // Show 5 reviews initially
  const [commentAreaVisible, setCommentAreaVisible] = useState(false); // Comment area visibility
  const [selectedRating, setSelectedRating] = useState(0); // Selected star rating
  const [commentText, setCommentText] = useState(""); // User's comment text

  // Use Effect to fetch review data when the page loads
  useEffect(() => {
    const fetchReview = async (id) => {
      // Get reviews
      const reviewData = await getReviewByFishId(ipAddress, id);
      setReview(reviewData);
      // Get fishes
      const fishData = await getFishById(ipAddress, id);
      setFish(fishData);
      setIsLoading(false);
    };
    fetchReview(itemId);
  }, []);

  // Function to calculate the average rating
  const calculateAverageStar = () => {
    const totalStars = review.reduce(
      (sum, item) => sum + parseInt(item.Sao),
      0
    );
    return (totalStars / 10 / review.length).toFixed(1);
  };

  // Function to handle "Sent" button click
  const handleComment = async () => {
    try {
      const response = await fetch(`http://${ipAddress}:8000/addReview/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerID: userInfo.ma_nguoi_dung,
          fishId: itemId,
          rating: selectedRating,
          comment: commentText,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert("You have commented on this fish!");
          // Refresh the reviews
          setReview((prev) => [
            ...prev,
            {
              Sao: selectedRating,
              BinhLuan: commentText,
              ThoiDiem: new Date().toISOString(),
              khachhang_info: {
                TenKhachHang: data.current_user.TenKhachHang,
                HinhAnh: data.current_user.HinhAnh,
              },
            },
          ]);
          setSelectedRating(0);
          setCommentText("");
          setCommentAreaVisible(false);
        }
      } else {
        alert("Comment failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to show the comment's timestamp
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);

    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits for day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0"); // Ensure 2 digits for hours
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Ensure 2 digits for minutes

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  // Render the review section
  const renderReview = ({ item }) => (
    <View style={styles.reviewItem}>
      <Image
        source={{
          uri: `data:image/jpeg;base64,${item.khachhang_info.HinhAnh}`,
        }}
        style={styles.avatar}
      />
      <View style={styles.reviewTextContainer}>
        <Text style={styles.customerName}>
          {item.khachhang_info.TenKhachHang}
        </Text>
        <View style={styles.starIcon}>
          {Array.from({ length: Math.floor(item.Sao / 10) }, (_, index) => (
            <Image
              source={require("../assets/images/icon/fullStarIcon_green.png")}
              key={index}
              style={{ width: 14, height: 14 }}
            />
          ))}
          {item.Sao % 10 !== 0 && (
            <Image
              source={require("../assets/images/icon/halfStarIcon_green.png")}
              style={{ width: 14, height: 14 }}
            />
          )}
        </View>
        <Text style={styles.commentText}>{item.BinhLuan}</Text>
        <Text style={styles.timestamp}>{formatDateTime(item.ThoiDiem)}</Text>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#b141aa" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.content}>
        <FlatList
          data={review.slice(0, visibleReviews)} // Limit visible reviews
          renderItem={renderReview}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => (
            <>
              {/* Fish Info */}
              <View style={styles.fishSection}>
                <Image
                  source={{
                    uri: `data:image/jpeg;base64,${fish.HinhAnh1}`,
                  }}
                  style={styles.fishImage}
                />
                <Text style={styles.fishName}>{fish.TenMatHang}</Text>
              </View>

              {/* Statistics Area */}
              <View style={styles.statisticArea}>
                <Text style={styles.statisticText}>
                  Average Rating:{" "}
                  {review.length > 0 ? calculateAverageStar() : "N/A"}{" "}
                  <Image
                    source={require("../assets/images/icon/fullStarIcon_green.png")}
                    style={{ width: 16, height: 16 }}
                  />
                </Text>
                <Text style={styles.statisticText}>
                  Total Comments: {review.length}
                </Text>
              </View>

              {/* No Review Message */}
              {review.length === 0 && (
                <View style={styles.noReviewContainer}>
                  <Text style={styles.noReviewText}>
                    There are no reviews yet for this fish.
                  </Text>
                </View>
              )}
            </>
          )}
          ListFooterComponent={() => (
            <>
              {review.length > 5 && visibleReviews < review.length && (
                <TouchableOpacity
                  style={styles.seeMoreButton}
                  onPress={() => setVisibleReviews((prev) => prev + 5)}
                >
                  <Text style={styles.seeMoreText}>See More</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        />
      </View>

      {commentAreaVisible ? (
        // Comment area
        <View style={styles.commentArea}>
          <View style={styles.commentHeader}>
            <Text style={styles.ratingText}>Rating:</Text>
            {/* Exit Button */}
            <TouchableOpacity
              style={styles.exitButton}
              onPress={() => setCommentAreaVisible(false)}
            >
              <Text style={styles.exitButtonText}>x</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.starRow}>
            {[10, 20, 30, 40, 50].map((star) => (
              <TouchableOpacity
                key={star}
                style={styles.starTouchable}
                onPressIn={(e) => {
                  const { locationX } = e.nativeEvent;
                  // Determine if the user tapped on the left (half) or right (full) of the star
                  const isHalf = locationX < 24; // Assuming each star is 24px wide
                  setSelectedRating(isHalf ? star - 5 : star);
                }}
              >
                <Image
                  source={
                    selectedRating >= star
                      ? require("../assets/images/icon/fullStarIcon.png")
                      : selectedRating >= star - 5
                      ? require("../assets/images/icon/halfStarIcon.png")
                      : require("../assets/images/icon/emptyStarIcon.png")
                  }
                  style={{ width: 48, height: 48 }}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Write your comment here..."
            value={commentText}
            onChangeText={setCommentText}
          />
          <Button title="Send" onPress={handleComment} />
        </View>
      ) : (
        // Comment button
        <View style={styles.fixedButtonContainer}>
          <Button
            title="Comment"
            onPress={() => setCommentAreaVisible(true)} // Show comment area
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  content: {
    flex: 1,
  },
  fishSection: {
    alignItems: "center",
    marginBottom: 16,
  },
  fishImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  fishName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },
  statisticArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 16,
  },
  statisticText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  noReviewContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  noReviewText: {
    fontSize: 16,
    color: "#888",
  },
  reviewItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  reviewTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  customerName: {
    fontWeight: "bold",
  },
  starIcon: {
    flexDirection: "row",
    marginTop: 5,
  },
  commentText: {
    marginVertical: 4,
    color: "#333",
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
  },
  seeMoreButton: {
    alignItems: "center",
    padding: 16,
  },
  seeMoreText: {
    color: "#007bff",
    fontSize: 16,
  },
  commentArea: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  exitButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  exitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  ratingText: {
    fontSize: 16,
    marginBottom: 8,
  },
  starRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  starTouchable: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    height: 100,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  fixedButtonContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});
