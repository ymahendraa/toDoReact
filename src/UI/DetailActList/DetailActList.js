import { useState } from "react";
import { HStack, Icon, Checkbox, Text } from "@chakra-ui/react";
import { GoPrimitiveDot } from "react-icons/go";
import { BiPencil } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { services } from "../../utilities/service";

const DetailActList = (props) => {
  const {swal, item, modalEditHandler} = props 
  const [isActive, setIsActive] = useState(item.is_active); 
  const [datas, setData] = useState({
        title:item.title,
        is_active:item.is_active,
        priority:item.priority
  })
  const updateDetailToDo = async () => {
    const data = await services["updateToDo"](item.id, datas)
      .then(async (response) => {
        console.log(response.data);
        return response.data;
      })
      .catch(async (err) => {
        throw new Error(err.message);
      });
    // return data;
  };
  const {isLoadingUpdate, mutate} = useMutation(updateDetailToDo)

  const isActiveHandler = async () => {
    await setIsActive(!isActive);
    await setData({...datas,
        is_active:!datas.is_active})
    mutate()
  };

  return (
    <div data-cy="activity-list">
      <HStack
        w={"80vw"}
        bg={"white"}
        boxShadow={"2xl"}
        h={"12vh"}
        borderRadius={"9px"}
        mt={"1rem"}
        paddingX={"2rem"}
        justifyContent={"space-between"}
      >
        <HStack gap={"1rem"}>
          <Checkbox
            size={"lg"}
            colorScheme={"twitter"}
            onChange={isActiveHandler}
            isChecked={!datas.is_active}
          />
          <Icon as={GoPrimitiveDot} color={"red"} w={7} h={7} />
          <Text fontSize={"lg"} as={!datas.is_active && "del"}>
            {item.title}
          </Text>
          <Icon
            as={BiPencil}
            w={5}
            h={5}
            color={"blackAlpha.600"}
            cursor={"pointer"}
            onClick={() => modalEditHandler(item)}
          />
        </HStack>

        <Icon
          as={BsTrash}
          w={6}
          h={6}
          color={"blackAlpha.500"}
          cursor={"pointer"}
          onClick={()=>swal(item)}
        />
      </HStack>
    </div>
  );
};

export default DetailActList;
