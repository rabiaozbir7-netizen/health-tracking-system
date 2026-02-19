import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TextInput
} from "react-native";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [completed, setCompleted] = useState([]);
  const [points, setPoints] = useState(0);
  const [customText, setCustomText] = useState("");
  const [customCategory, setCustomCategory] = useState("Nefes");

  const categories = ["Tümü", "Nefes", "Fiziksel", "Zihinsel", "Mini Görev"];

  const [exercises, setExercises] = useState([
    { id: "1", title: "4-4-4 Nefes Tekniği", category: "Nefes" },
    { id: "2", title: "5 Dakika Yürüyüş", category: "Fiziksel" },
    { id: "3", title: "Şükür Listesi Yaz", category: "Zihinsel" },
    { id: "4", title: "Soğuk Su ile Yüz Yıka", category: "Mini Görev" }
  ]);

  const toggleComplete = (id) => {
    if (completed.includes(id)) return;

    setCompleted([...completed, id]);
    setPoints(points + 10);
  };

  const addCustomExercise = () => {
    if (!customText.trim()) return;

    const newExercise = {
      id: Date.now().toString(),
      title: customText,
      category: customCategory
    };

    setExercises([...exercises, newExercise]);
    setCustomText("");
  };

  const resetDay = () => {
    setCompleted([]);
    setPoints(0);
  };

  const filteredExercises =
    selectedCategory === "Tümü"
      ? exercises
      : exercises.filter((e) => e.category === selectedCategory);

  const progress = exercises.length
    ? Math.round((completed.length / exercises.length) * 100)
    : 0;

  const getMessage = () => {
    if (points >= 40) return "🌟 Harika gidiyorsun!";
    if (points >= 20) return "💪 Devam et!";
    return "🌿 Küçük adımlar büyük fark yaratır.";
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>StressLess</Text>

      <View style={styles.pointsBox}>
        <Text>Puan: {points}</Text>
        <Text>{getMessage()}</Text>

        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${progress}%` }]}
          />
        </View>
      </View>

      {/* Kategori Seçimi */}
      <View style={styles.categoryRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryBtn,
              selectedCategory === cat && styles.activeCategory
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={{ color: selectedCategory === cat ? "white" : "black" }}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Kullanıcı Egzersiz Ekleme */}
      <View style={styles.addBox}>
        <TextInput
          placeholder="Yeni egzersiz ekle..."
          value={customText}
          onChangeText={setCustomText}
          style={styles.input}
        />

        <View style={styles.categoryRow}>
          {categories.slice(1).map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.smallCategoryBtn,
                customCategory === cat && styles.activeCategory
              ]}
              onPress={() => setCustomCategory(cat)}
            >
              <Text style={{ color: customCategory === cat ? "white" : "black" }}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addBtn} onPress={addCustomExercise}>
          <Text style={{ color: "white" }}>Ekle</Text>
        </TouchableOpacity>
      </View>

      {/* Liste */}
      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.title}</Text>

            <TouchableOpacity
              style={[
                styles.doneBtn,
                completed.includes(item.id) && styles.completedBtn
              ]}
              onPress={() => toggleComplete(item.id)}
            >
              <Text style={{ color: "white" }}>
                {completed.includes(item.id) ? "Tamamlandı" : "Yaptım"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.resetBtn} onPress={resetDay}>
        <Text style={{ color: "white" }}>Günü Sıfırla</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#eef2ff"
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15
  },
  pointsBox: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20
  },
  progressBar: {
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 10,
    marginTop: 10
  },
  progressFill: {
    height: 8,
    backgroundColor: "#667eea",
    borderRadius: 10
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10
  },
  categoryBtn: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8
  },
  smallCategoryBtn: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 15,
    marginRight: 6,
    marginBottom: 6
  },
  activeCategory: {
    backgroundColor: "#667eea"
  },
  addBox: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 10,
    marginBottom: 10
  },
  addBtn: {
    backgroundColor: "#667eea",
    padding: 10,
    borderRadius: 10,
    alignItems: "center"
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  doneBtn: {
    backgroundColor: "#667eea",
    padding: 8,
    borderRadius: 10
  },
  completedBtn: {
    backgroundColor: "green"
  },
  resetBtn: {
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10
  }
});







