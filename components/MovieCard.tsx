import PosterTile from '@/components/ui/PosterTile';
import { Movie } from '@/types/movie';
import React from 'react';

interface MovieCardProps {
  movie: Movie;
  onPress?: () => void;
}

export default function MovieCard({ movie, onPress }: MovieCardProps) {
  return <PosterTile movie={movie} onPress={onPress} />;
}
