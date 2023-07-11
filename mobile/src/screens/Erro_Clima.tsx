import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Autocomplete from 'react-native-autocomplete-input';

const Clima = () => {
  const [films, setFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [selectedValue, setSelectedValue] = useState({});

  useEffect(() => {
    fetch('https://abooutreactapis.000webhostapp.com/getpost.php?offset=1')
      .then((res) => res.json())
      .then((json) => {
        const {results: films} = json;
        setFilms(films);        
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  const findFilm = (query) => {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
      setFilteredFilms(
        films.filter((film) => film.title.search(regex) >= 0)
      );
    } else {
      setFilteredFilms([]);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={filteredFilms}
          defaultValue={
            JSON.stringify(selectedValue) === '{}' ?
            '' :
            selectedValue.title
          }
          onChangeText={(text) => findFilm(text)}
          placeholder="Enter the film title"
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedValue(item);
                setFilteredFilms([]);
              }}>
              <Text style={styles.itemText}>
                  {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.descriptionContainer}>
          {films.length > 0 ? (
            <>
              <Text style={styles.infoText}>
                   Selected Data
              </Text>
              <Text style={styles.infoText}>
                {JSON.stringify(selectedValue)}
              </Text>
            </>
          ) : (
            <Text style={styles.infoText}>
                Enter The Film Title
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
export default Clima;