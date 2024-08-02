import React, { useEffect, useState } from "react"
import { PermissionsAndroid, View } from "react-native"
import { LeafletView } from "react-native-leaflet-view"
import { Text } from 'react-native';
import Geolocation from '@react-native-community/geolocation';



interface IMapComponentProps {
    heightMap?: number;
}

export const MapComponent = (props: IMapComponentProps) => {
    const [userLocation, setUserLocation] = useState([0, 0])
    const [selectedPin, setSelectedPin] = useState(null)

    useEffect(() => {

        const load = async () => {
            try {
                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.CAMERA,
                  {
                    title: 'Cool Photo App Camera Permission',
                    message:
                      'Cool Photo App needs access to your camera ' +
                      'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                  },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  console.log('You can use the camera');
                } else {
                  console.log('Camera permission denied');
                }
              } catch (err) {
                console.warn(err);
              }
        }

            load();
        }, [])


    return (
        <View style={{ width: '100%', height: props.heightMap ? props.heightMap : '100%' }}>
            <View>
                <Text>
                    Componente de Mapa
                </Text>
                <Text>{`Centro de Mapa ${userLocation[0] + '-' + userLocation[1]}`}</Text>
            </View>
            <View>
                <LeafletView
                    onMessageReceived={(m => { console.log(m) })}
                    mapCenterPosition={userLocation}
                />
            </View>
        </View>
    )
}