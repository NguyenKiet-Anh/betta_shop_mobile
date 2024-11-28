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
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

// Import Contexts Here
import { useAuth } from "../context/authContext";

// Import Routes Here
import { getReviewByFishId } from "../routes/ReviewRoutes/ReviewRoutes";
import { getFishById } from "../routes/DetailScreen/DetailRoutes";

export default function Review({ route }) {
  // Variable for user id
  const { userInfo } = useAuth();
  const ipAddress = "192.168.232.102";
  //   const ipAddress = "192.168.1.21";
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

  // Fetch review data when the page loads
  useEffect(() => {
    const fetchReview = async (id) => {
      // Get reviews
      const reviewData = await getReviewByFishId(id);
      setReview(reviewData);
      // Get fishe
      const fishData = await getFishById(id);
      setFish(fishData);
      setIsLoading(false);
    };
    fetchReview(itemId);
  }, []);

  // Function to calculate the average rating
  const calculateAverageStar = () => {
    const totalStars = review.reduce((sum, item) => sum + item.Sao, 0);
    return (totalStars / review.length).toFixed(1);
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
        console.log(data);
        if (data.success) {
          alert("You have commented on this fish!");
          // Refresh the reviews
          setReview((prev) => [
            ...prev,
            { Sao: selectedRating, BinhLuan: commentText },
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
        <Text style={styles.starText}>{item.Sao} ★</Text>
        <Text style={styles.commentText}>{item.BinhLuan}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.ThoiDiem).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

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
                  {review.length > 0 ? calculateAverageStar() : "N/A"} ★
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
          <Text style={styles.ratingText}>Rating:</Text>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setSelectedRating(star)}
              >
                <Text
                  style={
                    selectedRating >= star
                      ? styles.filledStar
                      : styles.emptyStar
                  }
                >
                  ★
                </Text>
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
  starText: {
    color: "#4CAF50",
  },
  commentText: {
    marginTop: 4,
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
  ratingText: {
    fontSize: 16,
    marginBottom: 8,
  },
  starRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  filledStar: {
    fontSize: 24,
    color: "#ffa500",
  },
  emptyStar: {
    fontSize: 24,
    color: "#ddd",
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
