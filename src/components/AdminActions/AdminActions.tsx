/** @format */

import "./AdminActions.scss";
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   useDisclosure,
   ModalBody,
   ModalCloseButton,
} from "@chakra-ui/react";
import AddPart from "../AddPart/AddPart";
import AddCar from "../AddCar/AddCar";

function AdminActions() {
   const {
      isOpen: addCarIsOpen,
      onOpen: addCarOnOpen,
      onClose: addCarOnClose,
   } = useDisclosure();

   const {
      isOpen: addPartIsOpen,
      onOpen: addPartOnOpen,
      onClose: addPartOnClose,
   } = useDisclosure();
   
   return (
      <div className="admin-actions">
         <div className="actions">
            <div className="action">
               <button onClick={addCarOnOpen}>Add Car</button>
            </div>
            <div className="action">
               <button onClick={addPartOnOpen}>Add Part</button>
            </div>
            <div className="action">
               <button>View Dashboard</button>
            </div>
         </div>
         <div className="form-modals">
            <Modal isOpen={addPartIsOpen} onClose={addPartOnClose}>
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader>Add Part</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                     <AddPart />
                  </ModalBody>
               </ModalContent>
            </Modal>

            <Modal isOpen={addCarIsOpen} onClose={addCarOnClose}>
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader>Add Car</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                     <AddCar/>
                  </ModalBody>
               </ModalContent>
            </Modal>
         </div>
      </div>
   );
}

export default AdminActions;
