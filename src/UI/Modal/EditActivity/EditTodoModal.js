/** @format */

import { useState } from "react";
import {
  Modal,
  Icon,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { GoPrimitiveDot } from "react-icons/go";
import Select from "react-select";

const options = [
  { value: "Very High", text: "very-high", color: "#ED4C5C" },
  { value: "High", text: "high", color: "#FFCE31" },
  { value: "Medium", text: "normal", color: "#00A790" },
  { value: "Low", text: "low", color: "#43C4E3" },
  { value: "Very Low", text: "very-low", color: "#B01AFF" },
];
const EditToDoModal = ({ onClose, isOpen, selectedData }) => {
  // console.log(selectedData.title);
  const [data, setData] = useState({
    title: selectedData.title,
    is_active: selectedData.is_active,
    priority: selectedData.priority,
  });
  const [title, setTitle] = useState(selectedData.title)
  console.log(title)
  let selectedIsActive = options.findIndex((option) => {
    return option.text === selectedData.priority;
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange = (event) => {
    setSelectedOption(event);
  };
  const itemNameHandler = (event) => {
    // setData({ ...data, title: event.target.value });
    setTitle(event.target.value)
  };

  return (
    <div data-cy="edit-activity-modal">
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit List Item</ModalHeader>
          <ModalCloseButton/>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel fontSize={"xs"} fontWeight={"bold"}>
                NAMA LIST ITEM
              </FormLabel>
              <Input value={data.title} onChange={itemNameHandler} type='text'/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize={"xs"} fontWeight={"bold"}>
                PRIORITY
              </FormLabel>
              <Select
                // placeholder={e[0].label}
                components={{
                  IndicatorSeparator: () => null,
                }}
                value={options[selectedIsActive]}
                options={options}
                onChange={handleChange}
                getOptionLabel={(e) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Icon as={GoPrimitiveDot} color={e.color} />
                    <span style={{ marginLeft: 5 }}>{e.value}</span>
                  </div>
                )}
                delimiter={false}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor={"#16ABF8"}
              mr={3}
              borderRadius={"full"}
              color={"white"}
              w={"7rem"}
            >
              Tambah
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditToDoModal;
