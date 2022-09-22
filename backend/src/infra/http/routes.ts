import { Router } from 'express';
import { deviceRepo } from '../../repositories';
import CreateDevice from '../../useCases/createDevice/createDevice';
import createDeviceSchema from '../../useCases/createDevice/createDeviceSchema';
import FindDeviceById from '../../useCases/findDeviceById/findDeviceById';
import ListDevices from '../../useCases/listDevices/listDevices';
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

router.get('/devices', (req, res) => {
  const listDevices = new ListDevices(deviceRepo);

  const devices = listDevices.execute();

  return res.status(200).json(devices);
});

router.get('/devices/:id', (req, res) => {
  const findDeviceById = new FindDeviceById(deviceRepo);

  const device = findDeviceById.execute(req.params.id);

  if (device) {
    return res.status(200).json(device);
  }

  return res.status(404).send();
});

export default router;
