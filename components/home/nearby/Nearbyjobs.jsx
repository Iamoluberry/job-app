import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { COLORS, SIZES } from "../../../constants";

import styles from './nearbyjobs.style'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import Colors from '@/constants/Colors';
import useFetch from "../../../hooks/useFetch"
import { useRouter } from 'expo-router';

const Nearbyjobs = () => {
  const router = useRouter();
  

  const {data, isLoading, error} = useFetch('search', {query: 'React Native Developer', num_pages: 1})

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Nearby jobs</Text>
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
    data.map((job) => <NearbyJobCard 
    job={job} 
    key={`nearby-job-${job.job_id}`}
    handleNavigate={()=> router.push(`/(tabs)/homeTab/job-details/${job?.job_id}`)}
    />)
  )}
</View>

    </View>
  )
}

export default Nearbyjobs