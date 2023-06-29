import { StatusBar } from "expo-status-bar";
import { RefObject, useEffect, useRef } from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const ITEM_SIZE = 100;

export default function App() {
  const ref1 = useRef<View>(null);
  const ref2 = useRef<View>(null);
  const ref3 = useRef<View>(null);
  const ref4 = useRef<View>(null);

  const measure = (index: number, ref: RefObject<View>) => {
    ref.current?.measure((x, y, width, height, pageX, pageY) =>
      console.log(`${Platform.OS} - ${index + 1} - `, {
        x,
        y,
        width,
        height,
        pageX,
        pageY,
      })
    );
  };

  useEffect(() => {
    const refs = [ref1, ref2, ref3, ref4];

    setTimeout(() => refs.forEach((ref, index) => measure(index, ref)), 1000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* WORKS */}
      <View
        ref={ref1}
        style={{
          width: ITEM_SIZE,
          height: ITEM_SIZE,
          backgroundColor: "red",
          marginLeft: width - 1,
        }}
      />
      {/* WORKS */}
      <View
        ref={ref2}
        style={{
          width: ITEM_SIZE,
          height: ITEM_SIZE,
          marginTop: 50,
          backgroundColor: "blue",
          marginLeft: width,
        }}
      />
      {/* WORKS */}
      <FlatList
        data={[1]}
        horizontal
        keyExtractor={(item) => String(item)}
        contentContainerStyle={{ paddingLeft: width - 1 }}
        renderItem={({ item }) => (
          <View
            ref={ref3}
            style={{
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              backgroundColor: "green",
            }}
          />
        )}
      />
      {/* DOESN'T WORK */}
      <FlatList
        data={[1]}
        horizontal
        keyExtractor={(item) => String(item)}
        contentContainerStyle={{ paddingLeft: width }}
        renderItem={({ item }) => (
          <View
            ref={ref4}
            style={{
              width: ITEM_SIZE,
              height: ITEM_SIZE,
              backgroundColor: "orange",
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
  },
});
