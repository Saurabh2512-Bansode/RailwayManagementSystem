import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/logo.png";

const HomeScreen = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [trains, setTrains] = useState([]);
  const navigation = useNavigation();

  const handleSearch = async () => {
    if (!source || !destination) {
      Alert.alert("Error", "Please enter both source and destination.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get("http://localhost:9999/train/search", {
        params: { Source: source, Destination: destination },
      });

      if (response.data.length > 0) {
        setTrains(response.data); // Store the search results
        navigation.navigate("TrainList", { trains: response.data }); // Navigate to a new screen to display results
      } else {
        Alert.alert("No Trains Found", "No trains are available for the given source and destination.");
      }
    } catch (error) {
      console.error("Search error:", error);
      Alert.alert("Error", "Failed to fetch train details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo in the center */}
      <Image source={logo} style={styles.logo} />

      {/* Login buttons at the top right */}
      <View style={styles.loginContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("UserLogin")}>
          <Text style={styles.loginButtonText}>User Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("AdminLogin")}>
          <Text style={styles.loginButtonText}>Admin Login</Text>
        </TouchableOpacity>
      </View>

      {/* Train search section at the bottom */}
      <View style={styles.searchContainer}>
        <Text style={styles.title}>Search Train</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Source"
          value={source}
          onChangeText={setSource}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Destination"
          value={destination}
          onChangeText={setDestination}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Search</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 150,
    height: 150,
    position: "absolute",
    top: "30%", // Adjust this to center the logo vertically
  },
  loginContainer: {
    position: "absolute",
    top: 20, // Position at the top
    right: 20, // Position at the right
    flexDirection: "row",
    gap: 10,
  },
  loginButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  searchContainer: {
    width: "80%",
    position: "absolute",
    bottom: "20%", // Adjust this to position the search section
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default HomeScreen;