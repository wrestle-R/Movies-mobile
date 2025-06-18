import SearchBar from "@/components/SearchBar";
import { ScrollView,Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "@/constants/icons";

export default function Index() {
  return (
    <View className="bg-primary flex-1 items-center justify-center">
      <ScrollView contentContainerStyle={{ alignItems: "center", paddingTop: 48 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 18 }}>
          <Image 
          source={icons.movie_white}
          className="w-12 h-12 mr-2"
          />
          <Text style={{ fontSize: 28, fontWeight: "bold", color: "#fff", letterSpacing: 1 }}>
            Cinemans
          </Text>
        </View>
        <SearchBar />
        
      </ScrollView>
    </View>
  );
}
