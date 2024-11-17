import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (text: string) => {
    setSearchText(text);
    // Aqui você pode implementar lógica adicional, como filtrar a lista de medicamentos.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicamentos</Text>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar medicamentos..."
        value={searchText}
        onChangeText={handleInputChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});

export default SearchBar;
