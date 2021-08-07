import React from 'react';
import {connect} from 'react-redux';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {Text} from 'native-base';
import {Fonts, Colors} from '../../../styles';
import styles from './styles';

class SearchSegment extends React.PureComponent {
  getStoreName = id => {
    let index = this.props.availableStores.findIndex(store => store.id === id);

    if (index !== -1) {
      return this.props.availableStores[index].name;
    }

    return 'Error Loading Store';
  };

  render() {
    return (
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: 'lightgray',
        }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.segmentView}>
          {Object.keys(this.props.products).map((key, index) => (
            <TouchableOpacity
              key={`segment-buttons-${key}`}
              activeOpacity={0.9}
              onPress={() => this.props.action(index)}
              style={{
                ...styles.segmentButtons,
                backgroundColor:
                  this.props.index === index ? Colors.primary : 'white',
              }}>
              <Text
                style={{
                  color: this.props.index === index ? 'white' : Colors.primary,
                  fontSize: Fonts.size.min,
                }}>
                {this.getStoreName(key)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {availableStores} = state.store;

  return {availableStores};
};

export default connect(mapStateToProps, null)(SearchSegment);
