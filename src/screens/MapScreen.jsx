import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useItemsStore } from '../store/useItemsStore';

const MapScreen = () => {
  const items = useItemsStore((s) => s.items);

  // Берем координаты первой находки или ставим Москву по умолчанию
  const lat = items[0]?.coordinates?.latitude || 55.75;
  const lon = items[0]?.coordinates?.longitude || 37.61;

  // URL для встраивания карты 2ГИС. 
  // Мы используем публичный виджет 2ГИС по координатам.
  const mapUrl = `https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A${lat}%2C%22lon%22%3A${lon}%2C%22zoom%22%3A16%7D%7D`;

  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: mapUrl }} 
        style={styles.map} 
        startInLoadingState={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default MapScreen;

