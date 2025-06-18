import { icons } from '@/constants/icons'
import React from 'react'
import { Image, StyleSheet, TextInput, View } from 'react-native'

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Image
        source={icons.search}
        style={styles.icon}
        resizeMode="contain"
      />
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#b9b9b9"
        value=""
        onChangeText={() => {}}
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232323',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#ab8bff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    margin: 8,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    paddingVertical: 0,
  },
})