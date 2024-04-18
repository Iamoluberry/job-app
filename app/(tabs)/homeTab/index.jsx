import { ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SIZES } from '../../../constants/theme'
import React, { useState } from 'react';
import {Welcome, Popularjobs, Nearbyjobs} from '../../../components'
import { useRouter } from 'expo-router';

export default function TabOneScreen() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={{flex: 1, padding: SIZES.medium}}>
        <Welcome 
          searchTerm ={searchTerm}
          setSearchTerm={setSearchTerm}
          handleClick = {() => {
            router.push(`/(tabs)/homeTab/search/${searchTerm}`)
          }}
        />
        <Popularjobs/>
        <Nearbyjobs/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {}
});
