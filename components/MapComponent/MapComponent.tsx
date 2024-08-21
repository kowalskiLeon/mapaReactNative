import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Text, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import LeafletView from "../LeafletView";
import { MapMarker, WebviewLeafletMessage } from "../LeafletView/typescript/LeafletView/types";



interface IMapComponentProps {
  heightMap?: number;
  zoom: number;
}

export const MapComponent = (props: IMapComponentProps) => {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 })
  const [mapMarkers, setMapMarkers] = useState<MapMarker[]>([]);
  const { zoom } = props;
  console.log('>>>>', mapMarkers)
  const changePosition = (lat: number, lng: number) => {
    setUserLocation({ lat, lng })
  }

  const adicionarMarcador = (title: string, lat: number, lng: number) => {
    const mapMarker: MapMarker[] = [
      {
        id: `key_${title}`,
        title: title,
        icon: 'https://img.icons8.com/doodle/48/apple.png',
        position: { lat, lng },
      },
      {
        id: `key_temp`,
        title: title,
        icon: 'https://img.icons8.com/doodle/48/apple.png',
        position: { lat:-19.873518825746384, lng:-43.9863192304369 },
      },
      {
        id: `key_temp2`,
        title: title,
        icon: 'https://img.icons8.com/doodle/48/apple.png',
        position: { lat:-19.87428181041381, lng:-43.98590837396227 },
      },
      {
        id: `key_temp3`,
        title: title,
        icon: 'https://img.icons8.com/doodle/48/apple.png',
        position: { lat:-19.871401816138007, lng:-43.990417483736806}
      },
    ]
    setMapMarkers(mapMarker);
  }

  useEffect(() => {
    Geolocation.requestAuthorization(async () => {
      Geolocation.getCurrentPosition((value) => {
        changePosition(value.coords.latitude, value.coords.longitude);
        adicionarMarcador('Posição do Usuário', value.coords.latitude, value.coords.longitude);
      })
    }, (e) => {
      console.log(e)
      Alert.alert('Permisão não autorizada')
    })
  }, [])

  const processarMensagemRecebida = (m: WebviewLeafletMessage) => {
    console.log('mensagem:', m)
    if(m.event == "onMapMarkerClicked" && m.payload){
       const {payload} = m;
       console.log(payload)
       const clickedMarker = mapMarkers.find(marker => marker.id === payload.mapMarkerID);
      if (clickedMarker) {
        console.log('Marcador clicado:', clickedMarker.position.lat, clickedMarker.position.lng);
      }
    }
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
          onMessageReceived={processarMensagemRecebida}
          mapCenterPosition={userLocation}
          zoom={zoom}
          mapMarkers={mapMarkers}
          doDebug onError={undefined} onLoadEnd={undefined} onLoadStart={undefined} mapShapes={undefined} ownPositionMarker={undefined} androidHardwareAccelerationDisabled={undefined}        />
      </View>
    </>
  )
}