import { ScrollView, StyleSheet, Text, View } from "react-native";

const rows = [
  { label: "Annual membership", value: "₹1,200", status: "Paid" },
  { label: "Event contribution", value: "₹500", status: "Pending" },
];

export default function PaymentsScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Payments</Text>
      {rows.map((row) => (
        <View key={row.label} style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>{row.label}</Text>
            <Text style={styles.cardBody}>{row.status}</Text>
          </View>
          <Text style={styles.amount}>{row.value}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#eef4fb" },
  content: { padding: 20, gap: 14 },
  title: { color: "#102033", fontSize: 28, fontWeight: "800" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: "#dceaf7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: { color: "#123a66", fontSize: 16, fontWeight: "800" },
  cardBody: { marginTop: 6, color: "#516174" },
  amount: { color: "#102033", fontSize: 18, fontWeight: "800" },
});
