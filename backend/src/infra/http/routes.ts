import { Router } from 'express';
import { deviceRepo } from '../../repositories';
import CreateDevice from '../../useCases/createDevice/createDevice';
import createDeviceSchema from '../../useCases/createDevice/createDeviceSchema';
import validateRequest from './middlewares/validateRequest';

const router = Router();

router.get('/', (req, res) => {
  return res.send('Server is listening!');
});

router.post('/devices', validateRequest(createDeviceSchema), (req, res) => {
  const createDevice = new CreateDevice(deviceRepo);

  const newDevice = createDevice.execute(req.body);

  return res.status(200).json(newDevice);
});

export default router;
