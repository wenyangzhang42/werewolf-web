import React from "react";
import { Heading, Flex, Divider } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="gray.400"
    >
      <Flex align="center" mr={10}>
        <Heading as="h1" size="sm">Cat's Werewolves</Heading>
        <Divider />
      </Flex>
    </Flex>
  );
};

export default Header;