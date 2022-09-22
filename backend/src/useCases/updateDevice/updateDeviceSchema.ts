import Joi from 'joi';
import { UpdateDeviceRequest } from './updateDevice';

const updateDeviceSchema = Joi.object<UpdateDeviceRequest>({
  name: Joi.string().required(),
  serial: Joi.string().required(),
  macAddress: Joi.string().required(),
  type: Joi.string().valid('camera', 'sensor', 'remoteControl').required(),
});

export default updateDeviceSchema;
