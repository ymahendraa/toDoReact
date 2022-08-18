import { useState } from "react";
import {
  VStack,
  HStack,
  Text,
  Button,
  SimpleGrid,
  Stack,
  Container,
  Spinner,
  useToast,
  Icon,
} from "@chakra-ui/react";
import styled from "./Home.module.css";
import emptyImg from "../../img/activity-empty-state.png";
import { IoAddOutline } from "react-icons/io5";
import ActivityCard from "../../UI/ActivityCard/ActivityCard";
import { useQuery, useMutation, useQueryClient, QueryClient } from "react-query";
import { services } from "../../utilities/service";
import Header from "../../UI/Header/Header";
import Swal from "sweetalert2";
import { AiOutlineInfoCircle } from "react-icons/ai";

const HomeScreen = () => {
  const [id, setID] = useState(null)
  const toast = useToast();
  const queryClient = new useQueryClient();

  const swalHandler = (item) => {
    Swal.fire({
      // title: 'Are you sure?',
      html: "Apakah anda yakin akan menghapus item <b>bold text</b>",
      icon: "error",
      showCancelButton: true,
      // customClass: {
      //     cancelButton:"Custom_Cancel"
      // },
      confirmButtonColor: "#ED4C5C",
      cancelButtonColor: "grey",
      confirmButtonText: "Hapus",
    }).then((result) => {
      if (result.isConfirmed) {
        toast({
          // title: 'Account created.',
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
              <Text>Activity berhasil dihapus</Text>
            </HStack>
          ),
          duration: 9000,
          isClosable: true,
        });
      }
    });
  };
  const act = {
    "title" : "New 1",
    "email" : "yoga+1@skyshi.io"
  }
  const getDataActivities = async () => {
    const data = await services["getActivities"]()
      .then(async (response) => {
        // console.log(response.data);
        return response.data;
      })
      .catch(async (err) => {
        throw new Error(err.message);
      });
    return data;
  };

  const postNewActivities = async () => {
    const data = await services["createAct"](act)
      .then(async (response) => {
        // console.log(response.data);
        return response.data;
      })
      .catch(async (err) => {
        throw new Error(err.message);
      });
    return data;
  };

  const deleteAct = async () => {
    await services["deleteAct"](id)
      .then(async (response) => {
        // console.log(response.data);
        return response.data;
      })
      .catch(async (err) => {
        throw new Error(err.message);
      });
  }; 

  const { data, isError, isLoading, isFetching, isSuccess } = useQuery(
    "activities",
    getDataActivities
  );

  const {mutate:mutateCreate, isLoading:isLoadingCreate} = useMutation(postNewActivities, {
    onSuccess: () => {queryClient.invalidateQueries('activities')}
  }); 
  const {mutate:mutateDelete, isLoading:isLoadingDelete} = useMutation(deleteAct, {
    onSuccess: () => {queryClient.invalidateQueries('activities')}
  }); 

  const deleteHandler = async (ID) => {
    await setID(ID)
    await mutateDelete()
  }
  return (
    <div data-cy="state-activity" className={styled.container}>
      <Header />
      <Container maxW={'container.lg'}>
        <HStack
          alignItems={"center"}
          justifyContent={"space-between"}
          mt={"3rem"}
          mx={'2rem'}
        >
          <Text color={"#000"} fontSize={"4xl"} fontWeight={"bold"}>
            Activity
          </Text>
          <Button
            leftIcon={<IoAddOutline />}
            backgroundColor={"#16ABF8"}
            variant="solid"
            color={"#ffff"}
            borderRadius="2rem"
            onClick={mutateCreate}
          >
            Tambah
          </Button>
        </HStack>
        {/* {
          isLoading &&  <Spinner size='lg' color="blue.500"/>
        
        } */}
        {isSuccess ? (
          <div data-cy="filled-state-activity">
            <Stack
              width={"100%"}
              // height={"85vh"}
              alignItems={"center"}
              paddingY={"2rem"}
              direction={"column"}
            >
              <SimpleGrid columns={4} spacing={5}>
                {data?.map((item) => (
                  <ActivityCard item={item} key={item.id} deleteItem={deleteHandler} />
                ))}
              </SimpleGrid>
            </Stack>
          </div>
        ) : (
          <div data-cy="empty-state-activity" className={styled["home"]}>
            <VStack
              width={"100%"}
              height={"85vh"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <img src={emptyImg} alt="empty" />
            </VStack>
          </div>
        )}
      </Container>
    </div>
  );
};

export default HomeScreen;
