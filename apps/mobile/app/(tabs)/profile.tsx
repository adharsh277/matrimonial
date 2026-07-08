import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.profileHero}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.body}>Complete your details, family records, and privacy preferences here.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#eef4fb" },
  content: { padding: 20 },
  profileHero: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#dceaf7",
  },
  title: { color: "#102033", fontSize: 28, fontWeight: "800" },
  body: { marginTop: 8, color: "#516174", lineHeight: 22 },
});
