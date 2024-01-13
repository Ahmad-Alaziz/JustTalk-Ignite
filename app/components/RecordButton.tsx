import React, { useEffect, useState } from "react"
import { StyleSheet, TouchableHighlight, View } from "react-native"
import { Easing } from "react-native-reanimated"

import { FontAwesome } from "@expo/vector-icons"
import { MotiView } from "@motify/components"
import Voice, {
  SpeechErrorEvent,
  SpeechRecognizedEvent,
  SpeechResultsEvent,
} from "@react-native-voice/voice"
import { colors } from "@/theme"

type Props = {
  onSpeechStart: () => void
  onSpeechEnd: (results: string[]) => void
  onSpeechPartial: (partialResults: string[]) => void
}

const RecordButton = ({ onSpeechStart, onSpeechEnd, onSpeechPartial }: Props) => {
  const [voiceState, setVoiceState] = useState({
    recognized: "",
    pitch: 0,
    error: "",
    end: "",
    started: false,
    results: [],
    partialResults: [],
  })

  useEffect(() => {
    setupVoiceHandlers()
    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  const setupVoiceHandlers = () => {
    Voice.onSpeechStart = onVoiceStart
    Voice.onSpeechRecognized = onVoiceRecognized
    Voice.onSpeechEnd = onVoiceEnd
    Voice.onSpeechError = onVoiceError
    Voice.onSpeechResults = onVoiceResults
    Voice.onSpeechPartialResults = onVoicePartialResults
    Voice.onSpeechVolumeChanged = onVoiceVolumeChanged
  }

  const onVoiceStart = (e: any) => {
    console.log("onVoiceStart: ", e)
    setVoiceState((prevState) => ({ ...prevState, started: true }))
    onSpeechStart()
  }

  const onVoiceRecognized = (e: SpeechRecognizedEvent) => {
    console.log("onSpeechRecognized: ", e)
    setVoiceState((prevState) => ({ ...prevState, recognized: "√" }))
  }

  const onVoiceEnd = (e: any) => {
    console.log("onSpeechEnd: ", e)
    setVoiceState((prevState) => ({ ...prevState, end: "√", started: false }))
    onSpeechEnd(voiceState.results)
  }

  const onVoiceError = (e: SpeechErrorEvent) => {
    console.log("onSpeechError: ", e)
    setVoiceState((prevState) => ({
      ...prevState,
      end: "√",
      started: false,
      error: JSON.stringify(e.error),
    }))
  }

  const onVoiceResults = (e: SpeechResultsEvent) => {
    console.log("onSpeechResults: ", e)
    setVoiceState((prevState) => ({ ...prevState, results: e.value! }))
  }

  const onVoicePartialResults = (e: SpeechResultsEvent) => {
    console.log("onSpeechPartialResults: ", e)
    onSpeechPartial(e.value!)
    setVoiceState((prevState) => ({ ...prevState, partialResults: e.value! }))
  }

  const onVoiceVolumeChanged = (e: any) => {
    console.log("onSpeechVolumeChanged: ", e.value)
    setVoiceState((prevState) => ({ ...prevState, pitch: e.value }))
  }

  const startRecognizing = async () => {
    try {
      await Voice.start("en-US")
    } catch (e) {
      console.error(e)
    }
  }

  const stopRecognizing = async () => {
    try {
      await Voice.stop()
    } catch (e) {
      console.error(e)
    }
  }

  const renderButtonContent = () => {
    if (voiceState.started) {
      return <FontAwesome name="microphone-slash" size={24} color={colors.text} />
    }
    return <FontAwesome name="microphone" size={24} color={colors.text} />
  }

  const renderAnimation = () => {
    const scale = voiceState.pitch ? 1 + voiceState.pitch / 2 : 1
    return [...Array(3).keys()].map((index) => (
      <MotiView
        from={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0.06 * voiceState.pitch, scale }}
        transition={{
          type: "timing",
          duration: 1000,
          easing: Easing.out(Easing.ease),
          delay: index * 350,
          repeatReverse: false,
          loop: true,
        }}
        key={index}
        style={[StyleSheet.absoluteFillObject, styles.animationView]}
      />
    ))
  }

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={voiceState.started ? stopRecognizing : startRecognizing}
        onLongPress={startRecognizing}
      >
        <View style={styles.button}>
          {voiceState.started && renderAnimation()}
          {renderButtonContent()}
        </View>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  animationView: { backgroundColor: colors.tint, borderRadius: 75 },
  button: {
    alignItems: "center",
    backgroundColor: colors.tint,
    borderRadius: 75,
    height: 75,
    justifyContent: "center",
    position: "relative",
    width: 75,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
})

export default RecordButton
