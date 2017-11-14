import { StyleSheet } from 'react-native';

export const BaseStyles = StyleSheet.create({

  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },

  centerChildrenHorizontally: {
    alignItems: 'center',
  },

  centerChildren: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  alignChildrenBottom: {
    justifyContent: 'flex-end'
  }

});
