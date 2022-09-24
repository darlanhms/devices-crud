import { useParams } from 'react-router-dom';

const UpdateDevicePage: React.FC = () => {
  const { deviceId } = useParams();

  return <h1>Update device - {deviceId}</h1>;
};

export default UpdateDevicePage;
