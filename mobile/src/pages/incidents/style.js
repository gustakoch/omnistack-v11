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

  headerText: {
    fontSize: 16,
    color: '#999'
  },

  title: {
    fontSize: 26,
    marginTop: 48,
    marginBottom: 16,
    fontWeight: 'bold'
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#999'
  },

  incidentList: {
    marginTop: 30
  },

  incident: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    marginBottom: 16
  },

  incidentProp: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 4
  },

  incidentValue: {
    fontSize: 14,
    marginBottom: 24,
    color: '#666'
  },

  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  detailsButtonText: {
    fontSize: 15,
    color: '#e02141',
    fontWeight: 'bold'
  }
})
