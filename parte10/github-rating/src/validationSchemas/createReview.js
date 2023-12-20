import * as yup from 'yup';

export const reviewValidationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Repository owner name is required'),
    repositoryName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .required('Rating is required')
        .min(0, 'Rating must be at least 0') 
        .max(100, 'Rating cannot exceed 100'),
    text: yup
        .string()
  });