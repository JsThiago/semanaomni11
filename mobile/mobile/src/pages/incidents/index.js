import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
//TouchableOpacity é diferente do buttom pois o buttom já possui caracteristicas dos botões nativos
import logoImg from '../../assets/logo.png';
import styles from './styles'
import api from '../../services/api'
export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    function navigationToDetail(incident) {
        navigation.navigate('detail', { incident });
    }
    async function loadIncidents() {
        //Não buscar enquanto estiver buscando
        if (loading) {
            return;
        }
        //Já carregou pelo menos uma vez e ja tem todos os incidents carregados
        if (total > 0 && incidents.length === total) {
            return;
        }
        setLoading(true);
        const response = await api.get(`incidents`, {
            params: { page }
        });
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }
    useEffect(() => {
        loadIncidents()

    }, [])
    return (

        <View style={styles.container} >
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View >
            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>

            <FlatList
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                showsVerticalScrollIndicator={false}
                style={styles.incidentList}
                data={incidents}
                keyExtractor={
                    incident => String(incident.id)
                }
                renderItem={({//variavel incident recebe item
                    item: incident }) => (
                        <View style={styles.incidents}>
                            <Text style={styles.incidentsProperty}>ONG:</Text>
                            <Text style={styles.incidentsValue}>{incident.name}</Text>

                            <Text style={styles.incidentsProperty}>CASO:</Text>
                            <Text style={styles.incidentsValue}>{incident.title}</Text>

                            <Text style={styles.incidentsProperty}>VALOR:</Text>
                            <Text style={styles.incidentsValue}>{Intl.NumberFormat('pt-BR', {
                                style: 'currency', currency: 'BRL'
                            }).format(incident.value)} </Text>
                            <TouchableOpacity
                                onPress={() => navigationToDetail(incident)}
                                style={styles.detailsButton}>
                                <Text style={styles.detailsButtonText}> Ver mais detalhes</Text>
                                <Feather name="arrow-right" size={16} color="#E02041" />
                            </TouchableOpacity>
                        </View>)}
            />
        </View>

    )
}