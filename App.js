import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Button,
  PermissionsAndroid,
  Alert,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { MapComponent } from './components/MapComponent/MapComponent';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [permissaoMapas, setPermissaoMapas] = useState(false);

  const liberarPermissao = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Permissão de Localização",
          message:
            "Este aplicativo precisa acessar sua localização " +
            "para mostrar mapas.",
          buttonNeutral: "Pergunte-me depois",
          buttonNegative: "Cancelar",
          buttonPositive: "OK"
        }
      );
      console.log(granted)
      if (granted === PermissionsAndroid.RESULTS.GRANTED || granted == 'never_ask_again') {
        setPermissaoMapas(true);
      } else {
        Alert.alert("Permissão negada", "Não será possível exibir o mapa.");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>

        <Button
          onPress={liberarPermissao}
          title="Liberar Permissão"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        {permissaoMapas && <MapComponent heightMap={600} zoom={16} />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
