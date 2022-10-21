import React, { useEffect, useState } from "react";

import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure
} from "@chakra-ui/react";

const TestPage = () =>{

    const [total, setTotal] = useState(0)

    const GetTotalButton = () => {
        return (
          <Box p={1} shadow="sm">
            <Flex justify="space-between">
              <Text mt={4} as="div">
                <Flex align="end">
                    <GetTotal/>
                </Flex>
              </Text>
            </Flex>
          </Box>
        )
    }

    const GetTotal = () =>{
        const {isOpen, onOpen, onClose} = useDisclosure()
        let [role, setRole] = useState([])
        function clicked(){
            onOpen()
        }
        return (
            <>
              <Button h="1.5rem" size="sm" onClick={clicked}>Get total</Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                  <ModalHeader>The total is</ModalHeader>
                  <ModalCloseButton/>
                  <ModalBody>
                    <tg>{total}</tg>
                  </ModalBody>
                  <ModalFooter>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          )
    }

    const AddTotalButton = () => {
        return (
          <Box p={1} shadow="sm">
            <Flex justify="space-between">
              <Text mt={4} as="div">
                <Flex align="end">
                    <AddTotal/>
                </Flex>
              </Text>
            </Flex>
          </Box>
        )
    }


    const AddTotal = () => {
        function clicked(){
            setTotal(total+1)
        }
        return (
            <>
              <Button h="1.5rem" size="sm" onClick={clicked}>Add total</Button>
            </>
          )
    }



    return(
        <t>
            <GetTotalButton/>
            <AddTotalButton/>
            {/* <GetTotal/> */}
        </t>
    )
}


export default TestPage