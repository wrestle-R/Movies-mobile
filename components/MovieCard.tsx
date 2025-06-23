import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

interface MovieCardProps {
  movie: Movie;
  onPress?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : null;

  return (
    <TouchableOpacity 
      onPress={onPress}
      className="bg-gray-900 rounded-lg overflow-hidden"
      style={{ width: 120, marginHorizontal: 1, marginVertical: 4 }}
    >
      {/* Movie Poster */}
      <View className="rounded-lg overflow-hidden">
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-48"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-36 bg-gra y-900 items-center justify-center">
            <Text className="text-gray-400 text-xs">No Image</Text>
          </View>
        )}
      </View>

      {/* Movie Title */}
      <View className="p-2">
        <Text 
          className="text-white font-medium text-xs leading-3 text-center" 
          numberOfLines={2}
        >
          {movie.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;