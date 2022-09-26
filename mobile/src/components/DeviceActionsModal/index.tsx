import { Modal, ModalProps, View, TouchableWithoutFeedback, Button } from 'react-native';
import theme from '../../styles/theme';
import styles from './styles';

interface DeviceActionsModalProps extends ModalProps {
  open: boolean;
  onClose(): void;
  onEdit(): void;
  onDelete(): void;
}

const DeviceActionsModal: React.FC<DeviceActionsModalProps> = ({ open, onClose, onEdit, onDelete }) => {
  return (
    <Modal onRequestClose={onClose} animationType="fade" visible={open} transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <View style={styles.actionButtonContainer}>
              <Button color={theme.colors.primary} title="Editar" onPress={onEdit} />
            </View>
            <View style={styles.actionButtonContainer}>
              <Button color={theme.colors.error} title="Excluir" onPress={onDelete} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DeviceActionsModal;
