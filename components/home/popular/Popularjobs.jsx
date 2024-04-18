import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { COLORS, SIZES } from "../../../constants";

import styles from './popularjobs.style';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from "../../../hooks/useFetch";
import { useRouter } from 'expo-router';

const  Popularjobs = () => {
  const router = useRouter();
  

  const {data, isLoading, error} = useFetch('search', {query: 'React Native Developer', num_pages: 1});

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
  {isLoading ? (
    <ActivityIndicator size={'large'} color={COLORS.tertiary} />
  ) : error ? (
    <Text>Something went wrong</Text>
  ) : (
    <FlatList 
      data={data}
      renderItem={({item}) => (
        <PopularJobCard 
          item={item}
          handleCardPress={()=> router.push(`/(tabs)/homeTab/job-details/${item?.job_id}`)}
        />
      )}
      keyExtractor={item => item?.job_id}
      contentContainerStyle={{columnGap: SIZES.medium}}
      horizontal
    />
  )}
</View>

    </View>
  )
}

export default Popularjobs