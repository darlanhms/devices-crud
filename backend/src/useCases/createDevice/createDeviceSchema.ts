import Joi from 'joi';
import { CreateDeviceRequest } from './createDevice';

const createDeviceSchema = Joi.object<CreateDeviceRequest>({
  name: Joi.string().required(),
  serial: Joi.string().required(),
  macAddress: Joi.string().required(),
  type: Joi.string().valid('camera', 'sensor', 'remoteControl'),
});

export default createDeviceSchema;
