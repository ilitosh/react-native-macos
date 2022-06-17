
'use strict';

const React = require('react');

const {
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
} = require('react-native');

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    margin: 12,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

exports.displayName = (undefined: ?string);
exports.title = 'Lost Clicks';
exports.category = 'Bugs';
exports.description = 'Demo for lost clicks bug.';
exports.examples = ([
  {
    title: 'Secure Input Lost Clicks',
    render: function(): React.Node {
      const [clicks, setClicks] = React.useState(0);
      return (
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.input}
            editable
            secureTextEntry={true}
            placeholder="secure entry"
          />
          <Pressable
            style={styles.button}
            onPress={() => setClicks(clicks + 1)}
          >
            <Text>Presses: {clicks}</Text>
          </Pressable>
        </View>
      );
    },
  },
  {
    title: 'Multiline Lost Clicks',
    render: function(): React.Node {
      const [clicks, setClicks] = React.useState(0);
      return (
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.input}
            editable
            multiline={true}
            placeholder="secure entry"
          >
            {' '}
            (first raw text node)
            <Text style={{color: 'red'}}>(internal raw text node)</Text>
            (last raw text node)
          </TextInput>
          <Pressable
            style={styles.button}
            onPress={() => setClicks(clicks + 1)}
          >
            <Text>Presses: {clicks}</Text>
          </Pressable>
        </View>
      );
    },
  },
]: Array<RNTesterModuleExample>);
