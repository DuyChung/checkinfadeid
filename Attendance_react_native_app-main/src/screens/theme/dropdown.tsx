import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

export interface Props {
  name: string;
}

const DropdownScreen: React.FC<Props> = _props => {
  const [dropdown, setDropdown] = useState(null);
  const [dropdown1, setDropdown1] = useState(null);
  const [dropdown2, setDropdown2] = useState(null);

  const _header = () => {
    return (
      <View style={styles.header}>
        <View style={styles.pan} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        value={dropdown}
        onChange={item => {
          setDropdown(item.value);
          console.log('selected', item);
        }}
      />

      <Dropdown
        style={styles.dropdown2}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        value={dropdown1}
        onChange={item => {
          setDropdown1(item.value);
          console.log('selected', item);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={(20)}
          />
        )}
      />

      <Dropdown
        style={styles.dropdown}
        search
        searchPlaceholder="Search"
        iconColor={'gray'}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        value={dropdown2}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={'gray'}
            name="Safety"
            size={(20)}
          />
        )}
        onChange={item => {
          setDropdown2(item.value);
          console.log('selected', item);
        }}
      />
    </View>
  );
};

export default DropdownScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: (20),
  },
  dropdown: {
    marginTop: (20),
    backgroundColor: 'white',
    borderRadius: (12),
    padding: (12),
  },
  dropdown2: {
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: (0.5),
    marginTop: (20),
  },
  icon: {
    marginRight: (5),
  },
  header: {
    height: (40),
    width: '100%',
    borderTopLeftRadius: (16),
    borderTopRightRadius: (16),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: (0.3),
    borderBottomColor: '#DDDDDD',
    backgroundColor: 'gray',
  },
  pan: {
    width: (40),
    height: (6),
    borderRadius: (6),
    backgroundColor: 'white',
  },
});
