import { Router } from 'express';
import NotFoundError from '../../errors/NotFoundError';
import { deviceRepo } from '../../repositories';
import CreateDevice from '../../useCases/createDevice/createDevice';
import createDeviceSchema from '../../useCases/createDevice/createDeviceSchema';
import DeleteDevice from '../../useCases/deleteDevice/deleteDevice';
import FindDeviceById from '../../useCases/findDeviceById/findDeviceById';
import ListDevices from '../../useCases/listDevices/listDevices';
import UpdateDevice from '../../useCases/updateDevice/updateDevice';
import updateDeviceSchema from '../../useCases/updateDevice/updateDeviceSchema';
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

router.put('/devices/:id', validateRequest(updateDeviceSchema), (req, res) => {
  const updateDevice = new UpdateDevice(deviceRepo);

  try {
    const updatedDevice = updateDevice.execute({
      id: req.params.id,
      ...req.body,
    });

    return res.status(200).json(updatedDevice);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).send({ error: error.message });
    }

    return res.status(500).send();
  }
});

router.delete('/devices/:id', (req, res) => {
  const deleteDevice = new DeleteDevice(deviceRepo);

  const deleted = deleteDevice.execute(req.params.id);

  return res.status(200).json({ deleted });
});

export default router;
