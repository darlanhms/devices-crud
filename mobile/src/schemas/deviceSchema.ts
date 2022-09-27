import Joi from 'joi';

const deviceSchema = Joi.object({
  name: Joi.string().required().messages({ 'string.empty': 'Nome é obrigatório' }).required(),
  serial: Joi.string().required().messages({ 'string.empty': 'Serial é obrigatório' }),
  macAddress: Joi.string().min(17).required().messages({
    'string.empty': 'Mac address é obrigatório',
    'string.min': 'Mac address deve ter 17 caracteres',
  }),
  type: Joi.string().required().messages({ 'string.base': 'Tipo é obrigatório' }),
}).required();

export default deviceSchema;
