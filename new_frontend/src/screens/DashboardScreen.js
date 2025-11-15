import { Ionicons } from '@expo/vector-icons';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function DashboardScreen({ navigation, route }) {
  const { user } = route.params;

  const lists = [
    { id: 1, name: 'Weekly Groceries', items: 12, budget: 150 },
    { id: 2, name: 'Meal Prep Sunday', items: 8, budget: 75 }
  ];

  const totalItems = lists.reduce((sum, list) => sum + list.items, 0);
  const totalBudget = lists.reduce((sum, list) => sum + list.budget, 0);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          onPress: () => navigation.navigate('Login'),
          style: 'destructive'
        }
      ]
    );
  };

  const StatCard = ({ title, value, icon, color }) => (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <Text style={styles.statTitle}>{title}</Text>
        <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
      </View>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );

  const GroceryListCard = ({ list }) => (
    <TouchableOpacity style={styles.listCard}>
      <View style={styles.listHeader}>
        <Text style={styles.listName}>{list.name}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Active</Text>
        </View>
      </View>
      <View style={styles.listDetails}>
        <Text style={styles.listDetailText}>{list.items} items</Text>
        <Text style={styles.listDetailSeparator}>•</Text>
        <Text style={styles.listDetailText}>Budget: ${list.budget}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="cart" size={32} color="#16a34a" />
          <Text style={styles.headerTitle}>CartIQ</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.userInfo}>
            <Ionicons name="person-circle" size={24} color="#6b7280" />
            <Text style={styles.userName}>{user.name}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Welcome Banner */}
        <View style={styles.welcomeBanner}>
          <Text style={styles.welcomeTitle}>Welcome back, {user.name}!</Text>
          <Text style={styles.welcomeSubtitle}>Ready to plan your next shopping trip?</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <StatCard
            title="Active Lists"
            value={lists.length}
            icon="list"
            color="#16a34a"
          />
          <StatCard
            title="Total Items"
            value={totalItems}
            icon="add-circle"
            color="#3b82f6"
          />
          <StatCard
            title="Budget Total"
            value={`$${totalBudget}`}
            icon="cash"
            color="#8b5cf6"
          />
        </View>

        {/* Grocery Lists */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Grocery Lists</Text>
            <TouchableOpacity style={styles.newListButton}>
              <Ionicons name="add" size={20} color="white" />
              <Text style={styles.newListButtonText}>New List</Text>
            </TouchableOpacity>
          </View>

          {lists.map((list) => (
            <GroceryListCard key={list.id} list={list} />
          ))}
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <TouchableOpacity style={styles.featureCard}>
            <Text style={styles.featureTitle}>AI Meal Planner</Text>
            <Text style={styles.featureDescription}>
              Get personalized meal suggestions based on your dietary preferences and budget.
            </Text>
            <Text style={styles.featureLink}>Try Now →</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard}>
            <Text style={styles.featureTitle}>Price Compare</Text>
            <Text style={styles.featureDescription}>
              Compare prices across stores to find the best deals on your grocery items.
            </Text>
            <Text style={styles.featureLink}>Compare Prices →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 6,
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  welcomeBanner: {
    backgroundColor: '#16a34a',
    margin: 16,
    padding: 24,
    borderRadius: 16,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#dcfce7',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  newListButton: {
    flexDirection: 'row',
    backgroundColor: '#16a34a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  newListButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 4,
  },
  listCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  listName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  badge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#16a34a',
    fontSize: 12,
    fontWeight: '600',
  },
  listDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listDetailText: {
    fontSize: 14,
    color: '#6b7280',
  },
  listDetailSeparator: {
    marginHorizontal: 8,
    color: '#6b7280',
  },
  featuresContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  featureLink: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: '600',
  },
});