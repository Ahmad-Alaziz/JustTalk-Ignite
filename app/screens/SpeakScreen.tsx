import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { AppStackScreenProps } from "../navigators"
import { colors } from "../theme"
import RecordButton from "@/components/RecordButton"
import { Screen, Text } from "@/components"

interface SpeakScreenProps extends AppStackScreenProps<"Speak"> {}

export const SpeakScreen: FC<SpeakScreenProps> = observer(function SpeakScreen() {
  const [speechText, setSpeechText] = useState(
    "Hello test test test test test test  test test test test test  test test test test test  test test test test test  test test test test test  test test test test test",
  )
  const scrollViewRef = useRef<ScrollView>(null)

  return (
    <Screen contentContainerStyle={styles.container} safeAreaEdges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.textContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef?.current?.scrollToEnd({ animated: true })}
      >
        {speechText?.split(" ").map((word, i) => {
          return <Text key={i} style={styles.word} text={word} size="xxl" weight="bold" />
        })}
      </ScrollView>
      <View style={styles.voiceContainer}>
        <RecordButton
          onSpeechEnd={(value) => {
            value[0] && setSpeechText((prev) => prev + value[0])
          }}
          onSpeechStart={() => {
            setSpeechText("")
          }}
          onSpeechPartial={(value) => {
            value[0] && setSpeechText((prev) => prev + value[0])
          }}
        />
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    flexBasis: "35%",
    justifyContent: "center",
  },
  voiceContainer: {
    flex: 1,
    flexBasis: "65%",
  },
  word: {
    fontWeight: "bold",
    marginHorizontal: 5,
  },
})
