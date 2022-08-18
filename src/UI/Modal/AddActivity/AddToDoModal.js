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
import { useQuery, useMutation, useQueryClient } from "react-query";
import { services } from "../../../utilities/service";


const options = [
    { value: "Very High", text: "very-high", color: "#ED4C5C" },
    { value: "High", text: "high", color: "#FFCE31" },
    { value: "Medium", text: "normal", color: "#00A790" },
    { value: "Low", text: "low", color: "#43C4E3" },
    { value: "Very Low", text: "very-low", color: "#B01AFF" },
  ];
const AddToDoModal = ({ onClose, isOpen, id }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [toDoName, setToDoName] = useState("")
  const queryClient = new useQueryClient()
  const [data, setData] = useState({
    activity_group_id:id,
    title:toDoName,
    is_active:true,
    priority:selectedOption.text
  })
  const handleChange = (e) => {
    setSelectedOption(e);
  };
  const postNewToDo = async () => {
    await services["createToDo"](data)
      .then(async (response) => {
        // console.log(response.data);
        return response.data;
      })
      .catch(async (err) => {
        throw new Error(err.message);
      });
    // return data;
  };
  const {mutate:mutateCreate, isLoading:isLoadingCreate} = useMutation(postNewToDo, {
    onSuccess: () =>  {queryClient.invalidateQueries('detailAct')}
  }
    ); 
  const submitHandler = async () => {
    await setData({...data, priority:selectedOption.text, title:toDoName})
    await mutateCreate()
  }
  return (
    <div data-cy="add-activity-modal">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah List Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel fontSize={"xs"}>NAMA LIST ITEM</FormLabel>
              <Input placeholder="Tambahkan nama Activity" onChange={(event) => setToDoName(event.target.value)}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize={"xs"}>PRIORITY</FormLabel>
              <Select
                // placeholder={e[0].label}
                components={{
                    IndicatorSeparator: () => null
                  }}
                value={selectedOption}
                options={options}
                onChange={handleChange}
                getOptionLabel={(e) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Icon as={GoPrimitiveDot} color={e.color}/>
                    <span style={{ marginLeft: 5 }}>{e.value}</span>
                  </div>
                )}
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
              onClick={
                submitHandler
              }
            >
              Tambah
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* <VStack>
        <HStack>
          <Text>Tambah list Item</Text>
        </HStack>
      </VStack> */}
    </div>
  );
};

export default AddToDoModal;
