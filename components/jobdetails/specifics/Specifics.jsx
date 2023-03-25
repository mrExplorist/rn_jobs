import { Text, View } from "react-native";

import React from "react";
import styles from "./specifics.style";

const Specifics = ({ title, points }) => {
  return (
    // actully rendering the data about qualifications
    <View style={styles.container}>
      <Text style={styles.title}>{title} :</Text>

      <View style={styles.pointsContainer}>
        {points.map((item, index) => (
          <View style={styles.pointWrapper} key={item + index}>
            <Text style={styles.pointDot} />
            <Text style={styles.pointText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Specifics;
