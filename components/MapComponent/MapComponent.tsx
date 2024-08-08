import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { LatLng, LeafletView, MapMarker, WebviewLeafletMessage } from "react-native-leaflet-view"
import { Text, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';



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
      }
    ]
    setMapMarkers(mapMarker);
  }

  useEffect(() => {
    Geolocation.requestAuthorization(() => {
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
          doDebug
        />
      </View>
    </>
  )
}