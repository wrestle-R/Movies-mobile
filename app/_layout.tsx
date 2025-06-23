import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#030014' }}>
      <View style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#030014' }}>
        <Stack >
          <Stack.Screen
            name="(tab)"
            options={{
              headerShown: false,
            }}


          ></Stack.Screen>
          <Stack.Screen
            name="movies/[id]"
            options={{
              headerShown: false,
            }}


          ></Stack.Screen>
        </Stack>
      </View>
    </SafeAreaView>
  );
}
