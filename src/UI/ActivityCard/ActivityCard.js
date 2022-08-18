import { VStack, HStack, Text, Box, Icon } from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const ActivityCard = ({item, deleteItem}) => {
  let navigate = useNavigate();
  
  const handleDelete = () =>{
    deleteItem(item.id)
    console.log(item.id)
  }

  return (
    <div data-cy="card-activity">
      <Box
        backgroundColor={"#ffff"}
        width={"14rem"}
        height={"14rem"}
        boxShadow={"lg"}
        padding={"1rem"}
        borderRadius={"12px"}
      >
        <Box
          justifyContent={"space-between"}
          height={"80%"}
          alignItems={"start"}
          cursor={'pointer'} onClick={() => navigate(`/detail/${item.id}`)}
        >
          <Text fontWeight={"bold"} fontSize={"xl"} data-cy="activity-title">
            {item.title}
          </Text>
        </Box>
        <HStack gap={"2rem"}>
          <Text color={"blackAlpha.700"} cursor={"auto"}>
            {moment(item.created_at).format("DD MMMM YYYY")}
          </Text>
          <Icon
            as={BsTrash}
            w={6}
            h={6}
            color={"blackAlpha.500"}
            cursor={"pointer"}
            onClick={handleDelete}
          />
        </HStack>
      </Box>
    </div>
  );
};

export default ActivityCard;
