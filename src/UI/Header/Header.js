import {Box, Text} from '@chakra-ui/react'

const Header = () => {
    return ( 
        <div data-cy="header-title">
            <Box bgColor={"#16ABF8"} height={'15vh'} width={'100%'} justifyContent={'center'} display={'flex'} flexDirection={'column'} position={'relative'}>
                <Text color={'#ffff'} fontSize={'2xl'} fontWeight={'bold'} position={'absolute'} left={'15rem'}>
                    TO DO LIST APP
                </Text>
            </Box>
        </div>
     );
}
 
export default Header;