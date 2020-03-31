import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import api from '../../services/api'

import styles from './style'
import logo from '../../assets/logo.png'

export default function Incidents() {
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  useEffect(() => {
    loadIncidents()
  }, [])

  async function loadIncidents() {
    if (loading)
      return

    if (total > 0 && incidents.length === total)
      return

    setLoading(true)
    const response = await api.get('/incidents', {
      params: { page }
    })

    setIncidents([...incidents, ...response.data])
    setTotal(response.headers['x-total-count'])
    setLoading(false)
  }

  function navigateToDetails(incident) {
    navigation.navigate('Details', { incident })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <Text style={styles.headerText}>
          <Text style={{ fontWeight: 'bold' }}>{total}</Text> casos cadastrados
        </Text>
      </View>

      <Text style={styles.title}>Olá, seja bem vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        // showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProp}>ONG</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProp}>CASO</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProp}>VALOR</Text>
            <Text style={styles.incidentValue}>{
              Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => {navigateToDetails(incident)}}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}
