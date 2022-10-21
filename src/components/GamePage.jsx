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

// const {total, setTotal} = useState(0) 

const TodosContext = React.createContext({
    todos: [], fetchTodos: () => {}
})

export default function GamePage() {
    const [todos, setTodos] = useState([])
    const fetchTodos = async () => {
      const response = await fetch("http://192.168.3.154:8000/")
      const todos = await response.json()
      setTodos(todos.message)
    }
    useEffect(() => {
        fetchTodos()
    }, [])
    
    return (
      <TodosContext.Provider value={{todos, fetchTodos}}>
        {/* <AddTodo /> */}
        <Stack spacing={5}>
          <b>{todos}</b>
          {/* <GetTotalBotton/> */}
          <IdentityButton/>
          <SkillButton/>
          {/* {
            todos.map((todo) => (
              <TodoHelper item={todo.item} id={todo.id} fetchTodos={fetchTodos} />
            ))
          } */}
        </Stack>
      </TodosContext.Provider>
    )
}

function GetTotalBotton(){
  return (
    <Box p={1} shadow="sm">
      <Flex justify="space-between">
        <Text mt={4} as="div">
          <Flex align="end">
          <GetIdentity/>
          </Flex>
        </Text>
      </Flex>
    </Box>
  )
}


function GetTotal() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  let [role, setRole] = useState([])
  function clicked(){
    getIdentity()
    onOpen()
  }
  const getIdentity = async () => {
    let response = await fetch(`http://localhost:8000/role`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    let res = await response.json()

    setRole(res.message)
  }

  return (
    <>
      <Button h="1.5rem" size="sm" onClick={clicked}>Check Identity</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Your Role is</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <tg>{role}</tg>
          </ModalBody>

          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}




function AddTodo() {
    const [item, setItem] = React.useState("")
    const {todos, fetchTodos} = React.useContext(TodosContext)

    const handleInput = event  => {
        setItem(event.target.value)
    }
      
    const handleSubmit = (event) => {
        const newTodo = {
          "id": todos.length + 1,
          "item": item
        }
      
        fetch("http://192.168.3.154:8000/todo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTodo)
        }).then(fetchTodos)
    }
    return (
        <form onSubmit={handleSubmit}>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type="text"
              placeholder="Add a todo item"
              aria-label="Add a todo item"
              onChange={handleInput}
            />
          </InputGroup>
        </form>
    )
}


function UpdateTodo({item, id}) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [todo, setTodo] = useState(item)
  const {fetchTodos} = React.useContext(TodosContext)

  const updateTodo = async () => {
    await fetch(`http://localhost:8000/todo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: todo })
    })
    onClose()
    await fetchTodos()
  }

  return (
    <>
      <Button h="1.5rem" size="sm" onClick={onOpen}>Use Skill</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Input Skill Target</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type="text"
                placeholder="Add a todo item"
                aria-label="Add a todo item"
                value={todo}
                onChange={e => setTodo(e.target.value)}
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button h="1.5rem" size="sm" onClick={updateTodo}>Do It</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

function TodoHelper({item, id, fetchTodos}) {
  return (
    <Box p={1} shadow="sm">
      <Flex justify="space-between">
        <Text mt={4} as="div">
          {item}
          <Flex align="end">
            <UpdateTodo item={item} id={id} fetchTodos={fetchTodos}/>
          </Flex>
        </Text>
      </Flex>
    </Box>
  )
}

// Get identity functionality
function IdentityButton(){
  return (
    <Box p={1} shadow="sm">
      <Flex justify="space-between">
        <Text mt={4} as="div">
          <Flex align="end">
          <GetIdentity/>
          </Flex>
        </Text>
      </Flex>
    </Box>
  )
}

function GetIdentity() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  let [role, setRole] = useState([])
  function clicked(){
    getIdentity()
    onOpen()
  }
  const getIdentity = async () => {
    let response = await fetch(`http://localhost:8000/role`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    let res = await response.json()

    setRole(res.message)
  }

  return (
    <>
      <Button h="1.5rem" size="sm" onClick={clicked}>Check Identity</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Your Role is</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <tg>{role}</tg>
          </ModalBody>

          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}


function SkillButton(){
  return (
    <Box p={1} shadow="sm">
      <Flex justify="space-between">
        <Text mt={4} as="div">
          <Flex align="end">
          <UseSkill/>
            {/* <UpdateTodo item={item} id={id} fetchTodos={fetchTodos}/> */}
          </Flex>
        </Text>
      </Flex>
    </Box>
  )
}

function UseSkill() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  // const [todo, setTodo] = useState(item)
  // const {fetchTodos} = React.useContext(TodosContext)

  // const updateTodo = async () => {
  //   await fetch(`http://localhost:8000/todo/${id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: {JSON.stringify({ item: todo })}
  //   })
  //   onClose()
  //   await fetchTodos()
  // }

  return (
    <>
      <Button h="1.5rem" size="sm" onClick={onOpen}>Use Skill</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Input Skill Target</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type="text"
                placeholder="Input skill target"
                aria-label="Add a todo item"
                // value="Test Value"
                // value={todo}
                // onChange={e => setTodo(e.target.value)}
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button h="1.5rem" size="sm">Do It</Button>
            {/* <Button h="1.5rem" size="sm" onClick={updateTodo}>Do It</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

