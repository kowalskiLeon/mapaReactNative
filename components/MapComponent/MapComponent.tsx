import React, { useEffect, useState } from "react"
import { PermissionsAndroid, View } from "react-native"
import { LatLng, LeafletView, WebviewLeafletMessage } from "react-native-leaflet-view"
import { Text, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';



interface IMapComponentProps {
  heightMap?: number;
  zoom: number;
}

export const MapComponent = (props: IMapComponentProps) => {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 })
  const { zoom } = props;

  const changePosition = (lat, lng) => {
    setUserLocation({ lat, lng })
  }

  useEffect(() => {
    Geolocation.requestAuthorization(() => {
      Geolocation.getCurrentPosition((value) => {
        changePosition(value.coords.latitude, value.coords.longitude);
      })
    }, (e) => {
      console.log(e)
      Alert.alert('Permisão não autorizada')
    })
  }, [])

  const processarMensagemRecebida = (m: WebviewLeafletMessage) => {
    console.log('mensagem:', m)
  }

  return (
    <>
      <View>
        <Text>
          Componente de Mapa
        </Text>
        <Text>{`Centro de Mapa ${userLocation['lat'] + '-' + userLocation['lng']}`}</Text>
      </View>
      <View style={{ width: '100%', height: props.heightMap ? props.heightMap : '100%' }}>

        <LeafletView
          onMessageReceived={((m:WebviewLeafletMessage) => {processarMensagemRecebida(m)})}
          mapCenterPosition={userLocation}
          zoom={zoom}
        />
      </View>
    </>
  )
}