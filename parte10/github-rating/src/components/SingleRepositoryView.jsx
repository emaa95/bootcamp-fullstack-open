import RepositoryItem from '../components/RepositoryItem';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';
import useSingleRepository from '../hooks/useSingleRepository';
import { Text, StyleSheet, Pressable } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({ 
    gitHubContainer: {
        marginTop: 10,
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        minWidth: "85%",
        alignSelf:"center",
    },
    gitHubText:{
        color: theme.colors.fontColor,
        alignSelf: "center",
        padding:15,
        fontFamily: theme.fonts.main,
        fontWeight: theme.fontWeights.bold
    }
})
const SingleRepositoryView = () => {
    const { id } = useParams();
    const { repository } = useSingleRepository(id);

    console.log('repositoryId', id)

    const pressHandle = () => Linking.openURL(repository.url)

    return (
        <>
            <RepositoryItem           
            {...repository}
            >
            </RepositoryItem>
            <Pressable onPress={pressHandle} style={styles.gitHubContainer}>
                <Text style={styles.gitHubText}>Open in gitHub</Text>
            </Pressable>
        </>
    )
}

export default SingleRepositoryView;