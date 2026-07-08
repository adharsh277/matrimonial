import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const summaryCards = [
  { title: "Profile complete", value: "82%" },
  { title: "New notices", value: "4" },
  { title: "Payments due", value: "2" },
];

const quickLinks = ["News", "Payments", "Matrimony", "Profile"];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Member app</Text>
        <Text style={styles.title}>A calm, swipe-friendly space for community members.</Text>
        <Text style={styles.description}>
          View your profile, news, payments, and matrimony matches in one polished mobile experience.
        </Text>
      </View>

      <View style={styles.summaryRow}>
        {summaryCards.map((card) => (
          <View key={card.title} style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{card.value}</Text>
            <Text style={styles.summaryTitle}>{card.title}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick access</Text>
        <View style={styles.linkGrid}>
          {quickLinks.map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} style={styles.linkCard}>
              <Text style={styles.linkText}>{item}</Text>
            </Link>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent updates</Text>
        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>Community event scheduled for Sunday</Text>
          <Text style={styles.noticeText}>Push notification and announcement delivered to all members.</Text>
        </View>
        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>Membership dues reminder</Text>
          <Text style={styles.noticeText}>Two pending payments are due before the end of the month.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#eef4fb",
  },
  content: {
    padding: 20,
    gap: 20,
  },
  hero: {
    padding: 22,
    borderRadius: 28,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dceaf7",
    shadowColor: "#123a66",
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 3,
  },
  eyebrow: {
    color: "#1b4f8c",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    color: "#102033",
    marginTop: 10,
  },
  description: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 24,
    color: "#516174",
  },
  summaryRow: {
    flexDirection: "row",
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: "#dceaf7",
  },
  summaryValue: {
    color: "#123a66",
    fontSize: 24,
    fontWeight: "800",
  },
  summaryTitle: {
    marginTop: 6,
    color: "#516174",
    fontSize: 12,
    fontWeight: "600",
  },
  section: {
    gap: 14,
  },
  sectionTitle: {
    color: "#102033",
    fontSize: 18,
    fontWeight: "800",
  },
  linkGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  linkCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#dceaf7",
  },
  linkText: {
    color: "#123a66",
    fontSize: 15,
    fontWeight: "700",
  },
  noticeCard: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e6edf5",
  },
  noticeTitle: {
    color: "#102033",
    fontSize: 15,
    fontWeight: "800",
  },
  noticeText: {
    marginTop: 6,
    color: "#516174",
    fontSize: 13,
    lineHeight: 20,
  },
});