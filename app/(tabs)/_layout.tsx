
import { FontAwesome } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Pressable } from "react-native";
import React from "react";


export default function MenuStack(){
    return <Stack screenOptions={{
        headerTitle: '',
        headerShadowVisible: false,
        headerLeft: () => (
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="bars"
                  size={25}
                  style={{ opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
        ),

        headerRight: () => (
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="user"
                    size={25}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
          ),
    }}>
            <Stack.Screen name="index" options={{title: "Menu"}} />
         </Stack>
}