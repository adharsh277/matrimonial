import { ScrollView, StyleSheet, Text, View } from "react-native";

const notices = [
  { title: "Annual meeting announced", body: "Sunday 6:00 PM at the community hall." },
  { title: "Payments window open", body: "Membership dues can now be paid online." },
  { title: "Gallery updated", body: "New album added from the summer gathering." },
];

export default function NewsScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>News and notices</Text>
      {notices.map((notice) => (
        <View key={notice.title} style={styles.card}>
          <Text style={styles.cardTitle}>{notice.title}</Text>
          <Text style={styles.cardBody}>{notice.body}</Text>
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
  },
  cardTitle: { color: "#123a66", fontSize: 16, fontWeight: "800" },
  cardBody: { marginTop: 6, color: "#516174", lineHeight: 20 },
});
