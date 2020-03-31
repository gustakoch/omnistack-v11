import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

import api from '../../services/api'

import styles from './style'
import logo from '../../assets/logo.png'

export default function Details() {
  const navigation = useNavigation()
  const route = useRoute()

  const incident = route.params.incident
  const message = `Olá, ${incident.name}. Estou entrando em contato pois gostaria de ajudar com o caso "${incident.title}" com o valor de R$${incident.value},00`;

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    })
  }

  function sendWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <Feather name="arrow-left" size={30} color="#e02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProp, { marginTop: 0 }]}>ONG</Text>
        <Text style={styles.incidentValue}>{incident.name} de {incident.city} / {incident.uf}</Text>

        <Text style={styles.incidentProp}>DESCRIÇÃO</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProp}>VALOR</Text>
        <Text style={styles.incidentValue}>{
          Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroDescription}>Dados para entrar em contato</Text>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={sendWhatsApp}>
            <Text style={styles.buttonText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={sendMail}>
            <Text style={styles.buttonText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
