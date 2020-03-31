import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: '#f0f0f5'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  incident: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    marginTop: 48
  },

  incidentProp: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginTop: 24
  },

  incidentValue: {
    fontSize: 15,
    color: '#666'
  },

  contactBox: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 16
  },

  heroTitle: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold'
  },

  heroDescription: {
    fontSize: 18,
    color: '#666',
    marginTop: 24,
    marginBottom: 14
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  button: {
    backgroundColor: '#e02041',
    height: 50,
    borderRadius: 8,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
