import { ScrollView, StyleSheet, Text, View } from "react-native";

const profiles = [
  { title: "Asha", body: "Graduate · Mumbai · 28" },
  { title: "Rahul", body: "Professional · Pune · 30" },
];

export default function MatrimonyScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Matrimony</Text>
      {profiles.map((profile) => (
        <View key={profile.title} style={styles.card}>
          <Text style={styles.cardTitle}>{profile.title}</Text>
          <Text style={styles.cardBody}>{profile.body}</Text>
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
  cardBody: { marginTop: 6, color: "#516174" },
});
