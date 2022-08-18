/** @format */

import { useState, useEffect } from "react";
import {
  VStack,
  HStack,
  Text,
  Flex,
  Button,
  useDisclosure,
  Icon,
  Input,
  useToast,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import toDoEmpty from "../../img/todo-empty-state.png";
import { IoAddOutline } from "react-icons/io5";
import { FiChevronLeft } from "react-icons/fi";
import { BiPencil } from "react-icons/bi";
import { RiArrowUpDownLine } from "react-icons/ri";
import { BsSortUp, BsSortDown } from "react-icons/bs";
import {
  AiOutlineInfoCircle,
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import AddToDoModal from "../../UI/Modal/AddActivity/AddToDoModal";
import DetailActList from "../../UI/DetailActList/DetailActList";
import EditToDoModal from "../../UI/Modal/EditActivity/EditTodoModal";
import Swal from "sweetalert2";
import "./DetailActivity.css";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { services } from "../../utilities/service";
import Header from "../../UI/Header/Header";
import { useNavigate } from "react-router-dom";
import useFilter from "../../hooks/useFilter";

const DetailActivity = () => {
  let navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const queryClient = new useQueryClient();
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const [actName, setActName] = useState({ title: "" });
  const [selectedData, setSelectedData] = useState({});
  const toast = useToast();
  let { id } = useParams();

  const getDetailAct = async () => {
    const data = await services["getDetailActivity"](id)
      .then(async (response) => {
        console.log(response.data);
        return response.data
      })
      .catch(async (err) => {
        throw new Error(err.message);
      });
    setActName({ title: data.title });
    return data;
  };

  const updateDetailAct = async () => {
    await services["updateDetailAct"](id, actName)
      .then(async (response) => {
        console.log(response.data);
        return response.data;
      })
      .catch(async (err) => {
        throw new Error(err.message);
      });
    // return data;
  };
  const deleteToDo = async (id) => {
    await services["deleteToDo"](id)
      .then(async (response) => {
        console.log(response.data);
        return response.data;
      })
      .catch(async (err) => {
        throw new Error(err.message);
      });
    // return data;
  };

  const { isLoadingUpdate, mutate: mutateUpdate } =
    useMutation(updateDetailAct);
  const { isLoadingDelete, mutate: mutateDelete } = useMutation(deleteToDo, {
    onSuccess: () => {
      queryClient.invalidateQueries("detailAct");
    },
  });

  const {
    data,
    isSuccess,
  } = useQuery("detailAct", getDetailAct);
  const [flagFilter, setFlagFilter] = useState("");


  const { filteredData, onSearch } = useFilter(data, flagFilter);
  const actNameHandler = (event) => {
    setActName({ title: event.target.value });
  };

  const submitActNameHandler = () => {
    mutateUpdate();
    setIsClicked((current) => !current);
  };

  const modalAddHandler = () => {
    onOpenAdd();
  };

  const modalEditHandler = async (data) => {
    await setSelectedData(data);
    await onOpenEdit();
    // console.log(data);
  };
  // console.log(selectedData);

  const swalHandler = (item) => {
    Swal.fire({
      html: `Apakah anda yakin akan menghapus item <b>${item.title}</b>`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#ED4C5C",
      cancelButtonColor: "grey",
      confirmButtonText: "Hapus",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateDelete(item.id);
        toast({
          render: () => (
            <HStack
              color="black"
              bg={"#fffff"}
              p={2}
              boxShadow={"dark-lg"}
              borderRadius="8px"
              w={"100%"}
            >
              <Icon as={AiOutlineInfoCircle} color={"#00A790"} w={5} h={5} />
              <Text>{item.title} berhasil dihapus</Text>
            </HStack>
          ),
          duration: 9000,
          isClosable: true,
        });
      }
    });
  };

  return (
    isSuccess && (
      <div data-cy="detail-state-activity">
        <Header />
        <VStack
          width={"100%"}
          height={"85vh"}
          alignItems={"center"}
          // justifyContent={"center
          mt={"3rem"}
        >
          <HStack
            alignItems={"center"}
            width={"60vw"}
            justifyContent={"space-between"}
          >
            <HStack justifyContent={"center"} alignItems={"center"}>
              <Icon
                as={FiChevronLeft}
                w={8}
                h={8}
                color={"#000"}
                onClick={() => navigate(-1)}
                cursor={"pointer"}
              />
              {isClicked ? (
                <Input
                  type={"text"}
                  variant="flushed"
                  value={actName.title}
                  color={"#000"}
                  fontSize={"4xl"}
                  fontWeight={"bold"}
                  onChange={actNameHandler}
                  onBlur={submitActNameHandler}
                  autoFocus
                />
              ) : (
                <Heading onClick={() => setIsClicked(!isClicked)}>
                  {actName.title}
                </Heading>
              )}

              <Icon
                as={BiPencil}
                w={8}
                h={8}
                color={"#000"}
                cursor={"pointer"}
                onClick={() => setIsClicked(!isClicked)}
              />
            </HStack>

            <HStack
              justifyContent={"center"}
              alignItems={"center"}
              gap={"1rem"}
            >
              <Menu>
                <MenuButton>
                  <Flex
                    borderRadius={"full"}
                    w={"3rem"}
                    h={"3rem"}
                    borderColor={"blackAlpha.200"}
                    borderWidth={"1px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    cursor={"pointer"}
                  >
                    <Icon
                      as={RiArrowUpDownLine}
                      w={6}
                      h={6}
                      color={"blackAlpha.500"}
                    />
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => setFlagFilter("Terbaru")}
                    isDisabled={flagFilter === "Terbaru"}
                  >
                    <Icon as={BsSortUp} color={"#16ABF8"} w={5} />
                    <span>Terbaru</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => setFlagFilter("Terlama")}
                    isDisabled={flagFilter === "Terlama"}
                  >
                    <Icon as={BsSortDown} color={"#16ABF8"} w={5} />
                    <span>Terlama</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => setFlagFilter("A-Z")}
                    isDisabled={flagFilter === "A-Z"}
                  >
                    <Icon as={AiOutlineSortAscending} color={"#16ABF8"} w={5} />
                    <span>A-Z </span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => setFlagFilter("Z-A")}
                    isDisabled={flagFilter === "Z-A"}
                  >
                    <Icon
                      as={AiOutlineSortDescending}
                      color={"#16ABF8"}
                      w={5}
                    />
                    <span>Z-A</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => setFlagFilter("Belum Selesai")}
                    isDisabled={flagFilter === "Belum Selesai"}
                  >
                    <Icon as={RiArrowUpDownLine} color={"#16ABF8"} w={5} />
                    <span>Belum Selesai</span>
                  </MenuItem>
                </MenuList>
              </Menu>

              <Button
                leftIcon={<IoAddOutline />}
                backgroundColor={"#16ABF8"}
                variant="solid"
                color={"#ffff"}
                borderRadius="2rem"
                cursor={"pointer"}
                onClick={modalAddHandler}
              >
                Tambah
              </Button>
            </HStack>
          </HStack>
          {!onSearch &&
            data.todo_items &&
            data.todo_items.map((todos) => (
              <DetailActList
                // onEdit={modalEditHandler}
                data-cy="detail-list"
                swal={swalHandler}
                item={todos}
                key={todos.id}
                modalEditHandler={modalEditHandler}
              />
            ))}

          {onSearch &&
            filteredData.todo_items &&
            filteredData.todo_items.map((todo) => (
              <DetailActList
                // onEdit={modalEditHandler}
                data-cy="detail-list"
                swal={swalHandler}
                item={todo}
                key={todo.id}
                modalEditHandler={modalEditHandler}
              />
            ))}

          {!data.todo_items && !filteredData.todoItems && (
            <img src={toDoEmpty} alt="toDoEmpty" />
          )}
        </VStack>
        <AddToDoModal onClose={onCloseAdd} isOpen={isOpenAdd} id={id} />
        <EditToDoModal
          onClose={onCloseEdit}
          isOpen={isOpenEdit}
          selectedData={selectedData}
        />
      </div>
    )
  );
};

export default DetailActivity;
