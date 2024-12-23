import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Picker } from "@react-native-picker/picker";

// Import Routes Here
import { getStoreLocations } from "../routes/StoreLocationRoutes/StoreLocationRoutes";
import { useAuth } from "../context/authContext";

export default function StoreLocation() {
  const { ipAddress } = useAuth();
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Fetch store locations from backend
    const fetchStores = async () => {
      try {
        const location = await getStoreLocations(ipAddress);
        setStores(location);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchStores();
  }, []);

  // Find selected store details
  const selectedStoreDetails = stores.find(
    (store) => store.store_name === selectedStore
  );

  // Update map camera to focus on selected store's location
  useEffect(() => {
    if (selectedStoreDetails && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: parseFloat(selectedStoreDetails.latitude),
          longitude: parseFloat(selectedStoreDetails.longitude),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000 // Animation duration in milliseconds
      );
    }
  }, [selectedStoreDetails]);

  return (
    <View style={styles.container}>
      {/* Store Dropdown */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Store Name: </Text>
        <Picker
          selectedValue={selectedStore}
          onValueChange={(itemValue) => setSelectedStore(itemValue)}
          style={styles.dropdown}
        >
          <Picker.Item label="Select a store" value={null} />
          {stores.map((store, index) => (
            <Picker.Item
              key={index}
              label={store.store_name}
              value={store.store_name}
            />
          ))}
        </Picker>
      </View>

      {/* Store Details */}
      {selectedStoreDetails && (
        <View style={styles.storeDetails}>
          <Image
            source={{
              uri: `data:image/jpeg;base64,${selectedStoreDetails.store_image}`,
            }}
            style={styles.storeImage}
          />
          <Text style={styles.storeText}>
            <Text style={styles.bold}>Address: </Text>
            {selectedStoreDetails.address}
          </Text>
          <Text style={styles.storeText}>
            <Text style={styles.bold}>Working Hours: </Text>
            08:00 - 20:00 (Monday - Saturday)
          </Text>
        </View>
      )}

      {/* Google Map */}
      {selectedStoreDetails && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(selectedStoreDetails.latitude),
            longitude: parseFloat(selectedStoreDetails.longitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(selectedStoreDetails.latitude),
              longitude: parseFloat(selectedStoreDetails.longitude),
            }}
            title={selectedStoreDetails.store_name}
            description={selectedStoreDetails.address}
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  dropdown: {
    flex: 1,
    height: 40,
  },
  storeDetails: {
    marginVertical: 5,
    padding: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    elevation: 3,
  },
  storeImage: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  storeText: {
    fontSize: 14,
    marginVertical: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  map: {
    flex: 1,
    marginTop: 10,
  },
});
