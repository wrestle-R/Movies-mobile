import { Tabs } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { icons } from '../../constants/icons';

const PURPLE = "#A259FF";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              {focused ? (
                <View style={styles.activeTabOval}>
                  <Image
                    source={icons.home}
                    style={[styles.tabIcon, { tintColor: "#151312" }]}
                    resizeMode="contain"
                  />
                  <Text style={styles.activeTabLabel}>Home</Text>
                </View>
              ) : (
                <View style={styles.inactiveTabContainer}>
                  <Image
                    source={icons.home}
                    style={[styles.tabIcon, { tintColor: "#BDBDBD", marginRight: 0 }]}
                    resizeMode="contain"
                  />
                  {/* No text when not focused */}
                </View>
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              {focused ? (
                <View style={styles.activeTabOval}>
                  <Image
                    source={icons.search}
                    style={[styles.tabIcon, { tintColor: "#151312" }]}
                    resizeMode="contain"
                  />
                  <Text style={styles.activeTabLabel}>Search</Text>
                </View>
              ) : (
                <View style={styles.inactiveTabContainer}>
                  <Image
                    source={icons.search}
                    style={[styles.tabIcon, { tintColor: "#BDBDBD", marginRight: 0 }]}
                    resizeMode="contain"
                  />
                  {/* No text when not focused */}
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='saved'
        options={{
          title: 'Saved',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              {focused ? (
                <View style={styles.activeTabOval}>
                  <Image
                    source={icons.save}
                    style={[styles.tabIcon, { tintColor: "#151312" }]}
                    resizeMode="contain"
                  />
                  <Text style={styles.activeTabLabel}>Saved</Text>
                </View>
              ) : (
                <View style={styles.inactiveTabContainer}>
                  <Image
                    source={icons.save}
                    style={[styles.tabIcon, { tintColor: "#BDBDBD", marginRight: 0 }]}
                    resizeMode="contain"
                  />
                  {/* No text when not focused */}
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              {focused ? (
                <View style={styles.activeTabOval}>
                  <Image
                    source={icons.person}
                    style={[styles.tabIcon, { tintColor: "#151312" }]}
                    resizeMode="contain"
                  />
                  <Text style={styles.activeTabLabel}>Profile</Text>
                </View>
              ) : (
                <View style={styles.inactiveTabContainer}>
                  <Image
                    source={icons.person}
                    style={[styles.tabIcon, { tintColor: "#BDBDBD", marginRight: 0 }]}
                    resizeMode="contain"
                  />
                  {/* No text when not focused */}
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 40, // increased from 16 to bring navbar closer to center
    right: 40, // increased from 16 to bring navbar closer to center
    // bottom: 4,
    backgroundColor: '#000000',
    borderTopWidth: 0,
    elevation: 0,
    height: 50,
    marginBottom: 8,
    paddingBottom: 0,
    paddingTop: 5,
    paddingHorizontal: 5,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 18,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  activeTabOval: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PURPLE,
    borderRadius: 24,
    paddingHorizontal: 11,
    paddingVertical: 4,
    minWidth: 90,
    minHeight: 40,
  },
  tabIcon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
  activeTabLabel: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  inactiveTabLabel: {
    color: '#757575', // darker gray
    fontWeight: '400',
    fontSize: 11,     // smaller font size
    marginTop: 4,
  },
  inactiveTabContainer: {
    flexDirection: 'column', // icon on top, text below
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 8,
    minWidth: 80,
    minHeight: 36,
  },
})