import QRCodeSVG from 'react-native-qrcode-svg';
import { colors } from '../styles/colors';

type Props = {
  value: string,
  size: number
};

export function QRCode({ value, size }: Props) {
  return (
    <QRCodeSVG value={value} size={size} color={colors.white} backgroundColor='transparent' />
  );
}