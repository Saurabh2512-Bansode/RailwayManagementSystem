import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Passenger = ({ route }) => {
  const { train } = route.params;
  const [passengers, setPassengers] = useState([]);
  
  const addPassenger = () => {
    setPassengers([...passengers, { id: Date.now(), name: "", age: "" }]);
  };

  const removePassenger = (id) => {
    setPassengers(passengers.filter((p) => p.id !== id));
  };

  const updatePassenger = (id, field, value) => {
    setPassengers(
      passengers.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Passengers for Train {train.TrainNo}</Text>
      
      <FlatList
        data={passengers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.passengerItem}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={item.name}
              onChangeText={(text) => updatePassenger(item.id, "name", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Age"
              keyboardType="numeric"
              value={item.age}
              onChangeText={(text) => updatePassenger(item.id, "age", text)}
            />
            <TouchableOpacity onPress={() => removePassenger(item.id)}>
              <Ionicons name="trash" size={24} color="red" style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity onPress={addPassenger} style={styles.addButton}>
        <Ionicons name="add-circle" size={24} color="green" style={styles.icon} />
        <Text style={styles.addButtonText}>Add Passenger</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Ticket</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  passengerItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    padding: 5,
  },
  icon: {
    marginLeft: 10,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  addButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "green",
  },
  bookButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  bookButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Passenger;