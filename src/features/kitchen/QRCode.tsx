import {QRCodeCanvas} from 'qrcode.react';
import { app_url } from '../../lib/const'
import icon from '../../assets/icon.png'
function QRCode({ store_code }) {
  
  return (
    <QRCodeCanvas
        value={`${app_url}/menu/${store_code}`}
        size={128}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        includeMargin={false}
        imageSettings={{
            // src: "https://static.zpao.com/favicon.png",
            src: icon,
            x: undefined,
            y: undefined,
            height: 24,
            width: 24,
            excavate: true,
        }}
    />
  )
}

export default QRCode