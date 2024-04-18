import { Link, Stack, useLocalSearchParams, useRouter, useSearchParams } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from "react-native";

import {
  Company,
  ScreenHeaderBtn,
} from "../../../../components";

import Tabs from "../../../../components/jobdetails/tabs/Tabs";
import Specifics from '../../../../components/jobdetails/specifics/Specifics';
import About from '../../../../components/jobdetails/about/About';
import Footer from '../../../../components/jobdetails/footer/Footer';
import { COLORS, icons, SIZES } from "../../../../constants";
import useFetch from "../../../../hooks/useFetch";
import Colors from "@/constants/Colors";


function jobDetails() {
    const params = useLocalSearchParams();
    const {id} = params;

    const { data, isLoading, error, refresh } = useFetch('job-details', {job_id: params.id})

    const router = useRouter();


    const tabs = ['About', 'Qualification', 'Responsibilities'];
    const [activeTab, setActiveTab] = useState(tabs[0]);


    const displayTabContent = () => {
      if (activeTab === 'About') {
        return <About info={data[0].job_description ?? "No data provided"} />
      } else if (activeTab === 'Qualification') {
        return <Specifics 
                  title={tabs[1]}
                  points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
                />
      } else if (activeTab === 'Responsibilities') {
        return <Specifics 
                  title={tabs[2]}
                  points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
                />
      }
    }

    return(
        <SafeAreaView>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: COLORS.lightWhite},
                headerTitle: '',
                headerShadowVisible: false,
                headerLeft: () => (
                      <Pressable>
                        {({ pressed }) => (
                          <FontAwesome
                            name="arrow-left"
                            size={25}
                            style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                            onPress={() => router.back()}
                          />
                        )}
                      </Pressable>
                  ),

                  headerRight: () => (
                    <Pressable>
                      {({ pressed }) => (
                        <FontAwesome
                          name="share"
                          size={25}
                          style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                        />
                      )}
                    </Pressable>
                ),
                }}></Stack.Screen>

            <ScrollView showsVerticalScrollIndicator={false}>
                {isLoading ? <ActivityIndicator color={COLORS.tertiary} size="large"/> : error ? <Text>Something is wrong</Text> : data.length === 0 ? <Text>No data</Text> : 
                <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                   
                    <Company 
                    companyLogo={data[0].employer_logo}
                    jobTitle={data[0].job_title}
                    companyName={data[0].employer_name}
                    location={data[0].job_country}
                    />

                    <Tabs 
                      tabs={tabs}
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />

                    {displayTabContent()}
                </View>}
            </ScrollView>

            {isLoading ? "" : <Footer url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results/'}/>}
        </SafeAreaView>
        
        
    )
}


export default jobDetails