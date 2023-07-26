import * as yup from 'yup';

export const licensePlateValidationSchema = yup.object().shape({
  result: yup.string().required(),
  client_id: yup.string().nullable(),
});
