import Joi from 'joi';
import { DEFAULT_MASK_CHAR } from '../utils/mask';

const deviceSchema = Joi.object({
  name: Joi.string().required().messages({ 'string.empty': 'Nome é obrigatório' }).required(),
  serial: Joi.string().required().messages({ 'string.empty': 'Serial é obrigatório' }),
  macAddress: Joi.string().replace(new RegExp(DEFAULT_MASK_CHAR, 'g'), '').min(17).required().messages({
    'string.empty': 'Mac address é obrigatório',
    'string.min': 'Mac address deve ter 17 caracteres',
  }),
  type: Joi.string().required().messages({ 'string.base': 'Tipo é obrigatório' }),
}).required();

export default deviceSchema;
