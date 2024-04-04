import { Feather } from "@expo/vector-icons";
import { Image, ImageBackground, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { MotiView } from "moti";

import { colors } from "../styles/colors";
import { QRCode } from "./qrcode";
import { BadgeStore } from "../store/badge-store";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

type Props = {
  data: BadgeStore
  onChangeAvater?: () => void
  onExpandQRCode?: () => void
};

export function Credential({ onChangeAvater, onExpandQRCode, data }: Props) {
  const { height } = useWindowDimensions();

  return (
    <MotiView 
      className="w-full self-stretch items-center"
      from={{ opacity: 0, translateY: -height, rotateZ: "50deg" }}
      animate={{ opacity: 1, translateY: 0, rotateZ: "0deg"}}
      transition={{ duration: 5000 }}
    >
      <Image source={require('@/assets/ticket/band.png')} className="w-24 h52 z-10" />

      <View className="bg-black/20 self-stretch items-center pb-6 border border-white-10 mx-3 rounded-2xl -mt-5">
        <ImageBackground 
          source={require('@/assets/ticket/header.png')} 
          className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden" 
        >
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-zinc-50 text-sm font-bold">{data.eventTitle}</Text>
            <Text className="text-zinc-50 text-sm font-bold">#{data.id}</Text>
          </View>

          <View className="w-40 h-40 bg-black rounded-full" />
        </ImageBackground>

        { data.image ? (
          <TouchableOpacity activeOpacity={0.9} onPressOut={onChangeAvater}>
            <Image
              source={{ uri: data.image}}
              className="w-36 h-36 rounded-full -mt-24" 
            />
          </TouchableOpacity>
        ) : (
          <View className="-mt-24">
            <TouchableOpacity activeOpacity={0.9} onPressOut={onChangeAvater}>
              <View className="w-36 h-36 rounded-full bg-gray-400 items-center justify-center">
                <Feather name="camera" color={colors.green[500]} size={32} />
              </View>
            </TouchableOpacity>
          </View>
        )}

        <Text className="font-bold text-2xl text-zinc-50 mt-4">{data.name}</Text>

        <Text className="font-regular text-base text-zinc-50">{data.email}</Text>

        <QRCode value={data.checkInURL} size={120} />

        <View className="mt-6">
          <TouchableOpacity activeOpacity={0.7} onPressOut={onExpandQRCode}>
            <Text className="fond-body text-orange-500 text-sm">
              Ampliar QrCode
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </MotiView>
  );
}