import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { usePopularMovies } from "@/services/useFetch";
import { router } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { data: movies, loading: moviesLoading, error: moviesError, refetch } = usePopularMovies(1);

  // Limit to first 30 movies - add safety check
  const limitedMovies = movies?.results?.slice(0, 18) || [];

  const renderHeader = () => (
    <View className="items-center pt-12 pb-3 px-4 py-8">
      <View className="flex-row items-center mb-5 mt-8">
        <Image 
          source={icons.movie_white}
          className="w-12 h-12 mr-2"
        />
        <Text className="text-3xl font-bold text-white tracking-wide">
          Cinemans
        </Text>
      </View>

      <SearchBar 
        onPress={() => router.push("/search")}
        placeholder="Search for a Movie"
      />
      
      <Text className="text-xl font-bold text-white mt-4 mb-2 self-start">
        Latest Movies
      </Text>
    </View>
  );

  const renderMovieItem = ({ item }: { item: any }) => (
    <MovieCard 
      movie={item}
      onPress={() => {
        router.push(`/movie/${item.id}`);
      }}
    />
  );

  // Don't render anything until we have a definitive state
  if (moviesLoading) {
    return (
      <View className="bg-primary flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#ab8bff" />
        <Text className="text-white mt-4 text-lg">Loading movies...</Text>
      </View>
    );
  }

  if (moviesError) {
    return (
      <View className="bg-primary flex-1 items-center justify-center px-4">
        <Text className="text-red-400 text-center text-lg mb-4">
          Something went wrong
        </Text>
        <Text className="text-gray-300 text-center mb-4">
          {moviesError}
        </Text>
        <TouchableOpacity 
          onPress={refetch}
          className="bg-accent px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Only render the main content if we have data
  if (!movies) {
    return (
      <View className="bg-primary flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#ab8bff" />
      </View>
    );
  }

  return (
    <View className="bg-primary flex-1">
      <FlatList
        data={limitedMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovieItem}
        ListHeaderComponent={renderHeader}
        numColumns={3}
        columnWrapperStyle={{ 
          justifyContent: 'center', 
          paddingHorizontal: 4,
          gap:6
          
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        onRefresh={refetch}
        refreshing={moviesLoading}
        ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
      />
    </View>
  );
}

