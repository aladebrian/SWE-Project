import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeBanner}>
        <Text style={styles.welcomeTitle}>Welcome to CartIQ!</Text>
        <Text style={styles.welcomeSubtitle}>Your smart grocery assistant</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="list" size={32} color="#16a34a" />
          <Text style={styles.statValue}>2</Text>
          <Text style={styles.statLabel}>Active Lists</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="cart" size={32} color="#3b82f6" />
          <Text style={styles.statValue}>20</Text>
          <Text style={styles.statLabel}>Total Items</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Grocery Lists</Text>

        <View style={styles.listCard}>
          <Text style={styles.listName}>Weekly Groceries</Text>
          <Text style={styles.listDetails}>12 items • $150 budget</Text>
        </View>

        <View style={styles.listCard}>
          <Text style={styles.listName}>Meal Prep Sunday</Text>
          <Text style={styles.listDetails}>8 items • $75 budget</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => router.push("/")}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  welcomeBanner: {
    backgroundColor: "#16a34a",
    padding: 32,
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#dcfce7",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  listCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  listName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  listDetails: {
    fontSize: 14,
    color: "#6b7280",
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
