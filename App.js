import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      name: ''
    };
    this.enterName = this.enterName.bind(this);
  }  

  async componentDidMount() {
    await AsyncStorage.getItem('name').then((value) => {
      this.setState({name: value})
    })
  }

  async componentDidUpdate(_, prevState) {
    const name = this.state.name;
    if (prevState !== name) {
      await AsyncStorage.setItem('name', name);
    }
  }

  enterName() {
    this.setState({
      name: this.state.input,
    })
    alert('Saved successfull!');
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput style={styles.input}
            value={this.state.input}
            onChangeText={(text) => this.setState({ input: text })}
            underlineColorAndroid={'transparent'}
          />
          <TouchableOpacity onPress={this.enterName}>
            <Text style={styles.buttonAccess}>Save</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.name}>Hi, {this.state.name}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 350,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 3,
  },
  buttonAccess: {
    backgroundColor: '#222',
    height: 40,
    padding: 10,
    borderRadius: 3,
    color: '#fff',
    fontWeight: 'bold',
  },
  name: {
    marginTop: 15,
    fontSize: 20,
    textAlign: 'center',
  }
});

export default App;