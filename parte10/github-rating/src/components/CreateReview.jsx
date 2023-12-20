import { View, Button, StyleSheet } from "react-native"
import { Formik, useField } from 'formik';
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";
import { reviewValidationSchema } from "../validationSchemas/createReview";
import StyledTextInput from "./StyledTextInput";
import Text from '../components/StyledText';

const initialValues = {
    ownerName: '',
    rating: '',
    repositoryName: '',
    text: ''
}

const styles = StyleSheet.create({
    error: {
      color: 'red',
      fontSize: 12,
      marginBottom: 20,
      marginTop: -5
    },
    form: {
      margin: 12
    }
});

const FormikInputValue = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
  
    return (
      <>
          <StyledTextInput
              value={field.value}
              onChangeText={value => helpers.setValue(value)}
              error = {meta.error}
              {...props}
          />
          {meta.error && <Text style={styles.error}>{meta.error}</Text>}
      </>
    );
};

export default function CreateReview () {
    const [createReview, { error }] = useCreateReview();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { ownerName, rating, repositoryName, text} = values;
        console.log('press');

        try {
            const { data } = await createReview({ ownerName, rating, repositoryName, text });
            navigate(`/${data.createReview.repositoryId}`);
            if (data) {
                console.log('Se creó con éxito la revisión', data);
            } 
            if (error) {
                console.log('Error durante la creación de la revisión')
            } 
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Formik initialValues={initialValues} validationSchema={reviewValidationSchema} onSubmit={onSubmit}>
        {
            ({ handleSubmit }) => {
                return <View style={styles.form}>
                    <FormikInputValue
                        name='ownerName'
                        placeholder='Repository owner name'
                    />
                    <FormikInputValue
                        name='repositoryName'
                        placeholder='Repository name'
                    />
                    <FormikInputValue
                        name='rating'
                        placeholder='Rating between 0 and 100'
                    />
                    <FormikInputValue
                        name='text'
                        placeholder='Review'
                    />
                     <Button onPress={handleSubmit} title='Create a review' />
                    
                </View>
            }
        }
        </Formik>
    )
}