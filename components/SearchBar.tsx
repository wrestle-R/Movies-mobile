import { icons } from '@/constants/icons'
import React from 'react'
import { Image, TextInput, View } from 'react-native'

interface Props{
  placeholder: string;
  onPress: () => void;
}

const SearchBar = ({placeholder, onPress} : Props) => {
  return (
    <View className="flex-row items-center bg-[#232323] rounded-2xl border-[1.5px] border-[#ab8bff] px-[14px] py-2 m-2 w-52">
      <Image
        source={icons.search}
        className="w-[22px] h-[22px] mr-2"
        resizeMode="contain"
      />
      <TextInput
        className="flex-1 text-white text-[15px] py-[2px]"
        placeholderTextColor="#b9b9b9"
        value=""
        onPress={onPress}
        placeholder ={placeholder}
        onChangeText={() => {}}
      />
    </View>
  )
}

export default SearchBar