import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import { useProductStore } from "../store/products";
import { useState } from "react";


const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600","gray.200");
    const bg = useColorModeValue("white","gray.800");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [updatedProduct, setUpdatedProduct] = useState(product)

    const {deleteProduct, updateProduct} = useProductStore();

    const toast = useToast();
    const handleDeleteProduct = async (pid) => {
        const {success,message} = await deleteProduct(pid);
        if(!success){
            toast({
                title : 'Error',
                description :message,
                status : 'error',
                duration : 3000,
                isClosable : true
            })
        }
        else{
            toast({
                title : 'Success',
                description :"Product deleted successfully.",
                status : 'success',
                duration : 3000,
                isClosable : true
            })
        }
    }

    const changeEventHandler = (e) => {
        setUpdatedProduct({
            ...updatedProduct, [e.target.name] : e.target.value
         })
    }

    const handleUpdateProduct = async (pid,updatedProduct) => {
     const {success,message} =  await updateProduct(pid,updatedProduct);
     if(!success){ 
        toast({
            title : 'Error',
            description :message,
            status : 'error',
            duration : 3000,
            isClosable : true
        });
    }
    else{
        toast({
            title : 'Success',
            description :message,
            status : 'success',
            duration : 3000,
            isClosable : true
        })
        onClose();
    }
    }
    
  return (
    <Box
    shadow='lg'
    rounded='lg'
    overflow={'hidden'}
    transition='all 0.3s'
    _hover={{transform : "translateY(-5px)",shadow:"xl"}}
    bg={bg}
    >
        <Image src={product.image} alt={product.name} 
        h='48' w='full' objectFit='cover'/>

<Box p={3}>
        <Heading as='h3' size='md' mb='2' >
           {product.name}
        </Heading>

        <Text fontWeight='bold' fontSize='xl' color={textColor} mb='4'>
            ${product.price}
        </Text>

        <HStack spacing={2}>
            <IconButton icon={<EditIcon/>} colorScheme="blue" onClick={onOpen}/>
            <IconButton icon={<DeleteIcon/>} onClick={()=> handleDeleteProduct(product._id)} colorScheme="red"/>
        </HStack>

</Box>
<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <VStack spacing={4}>
            <Input placeholder="Product Name" name="name" value={updatedProduct.name} onChange={changeEventHandler}/>
            <Input placeholder="Price" name="price" type="number" value={updatedProduct.price} onChange={changeEventHandler} />
            <Input placeholder="Image URL" name="image" value={updatedProduct.image} onChange={changeEventHandler}/> 
           </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} 
            onClick={() => handleUpdateProduct(product._id,updatedProduct)}
            >
              Update
            </Button>
            <Button onClick={onClose} variant='ghost'>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Box>
  )
}

export default ProductCard;
