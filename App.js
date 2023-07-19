import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
export default function App() {
  const [modalIsVisible, setModalIsVIsible] = useState(false)
  const [courseGoals, setCoursGoals] = useState([]);

  function startAddFoalHandler() {
    setModalIsVIsible(true)
  }
  function endAddGoalHAndler() {
    setModalIsVIsible(false)
  }
  function addGoalHandler(enteredGoalText) {
    setCoursGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHAndler()
  }
  function deleteGoalHendler(id) {
    setCoursGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button title="Add New Goal" color="#b180f0" onPress={startAddFoalHandler} />
        <GoalInput onAddGoal={addGoalHandler} modalIsVisible={modalIsVisible} endAddGoalHAndler={endAddGoalHAndler} />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  onDeleteItem={deleteGoalHendler}
                  id={itemData.item.id}
                />
              );
            }}
            keyExtractor={(item, index) => {
              // return item.id;
              return index;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 4,
  },
});
