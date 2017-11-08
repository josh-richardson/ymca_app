import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  logo: {
    transform: [{scale: 0.6}],
    marginTop: '10%'
  },

  loginField: {
    width: '60%',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    marginTop: '2.5%',
    marginBottom: '2.5%',
  },

  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
