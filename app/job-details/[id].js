import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { COLORS, SIZES, icons } from "../../constants";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import React from "react";
import useFetch from "../../hook/useFetch";

// jobtabs array

const tabs = ["About", "Qualifications", "Responsibilities"];

// ActiveTab State

const jobDetails = () => {
  // Initialising params that will allow us to get specific-id of job-details page we are on
  const params = useSearchParams();

  const router = useRouter();

  // Populating data with the job-details data
  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {};

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );
      case "About":
        return (
          <JobAbout info={data[0].job_description ?? "No Data Provided"} />
        );

      case "Responsibilities":
      default:
        break;
      case value:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },

          headerShadowVisible: false,
          headerBackVisible: false,

          //   Creating custom backArrow

          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),

          headerTitle: "",
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No Data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {/* Calling displayTextContent as a function */}

              {displayTabContent()}
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default jobDetails;
