import React, { useState } from "react";
import { Box, Heading, Text, Textarea, Button, Image, Flex } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([{ text: "Hi, I'm LawGPT - an AI assistant for legal professionals. How can I help you today?", isUser: false }]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      const newMessage = { text: inputText, isUser: true };
      setMessages([...messages, newMessage]);
      setInputText("");

      // TODO: Call API to get AI response, for now just return a dummy lawyer-like response after 1 second
      setTimeout(() => {
        const responseMessage = { text: "Based on the legal details you provided, my analysis is that there are several potential avenues to explore to resolve this matter, subject to gathering additional facts and reviewing applicable laws and precedent cases. I'd be happy discuss options and next steps with you.", isUser: false };
        setMessages([...messages, newMessage, responseMessage]);
      }, 1000);
    }
  };

  return (
    <Box maxW="700px" mx="auto" p={8}>
      <Flex align="center" mb={8}>
        <Image src="https://images.unsplash.com/photo-1654171567797-0ff9b33a805b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxsYXclMjBpY29uJTIwb3IlMjBzeW1ib2x8ZW58MHx8fHwxNzExMTE4NDE5fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Law icon" w={12} h={12} mr={4} />
        <Heading size="xl">LawGPT</Heading>
      </Flex>

      <Box borderWidth={1} p={4} rounded="md" minH="sm" mb={4}>
        {messages.map((msg, index) => (
          <Text key={index} bg={msg.isUser ? "blue.100" : "gray.100"} p={2} rounded="md" mb={2}>
            {msg.text}
          </Text>
        ))}
      </Box>

      <Flex>
        <Textarea value={inputText} onChange={handleInputChange} placeholder="Enter your legal question or details..." mr={4} />
        <Button colorScheme="blue" onClick={handleSendMessage} leftIcon={<FaPaperPlane />}>
          Send
        </Button>
      </Flex>

      <Text mt={8} color="gray.500">
        Disclaimer: LawGPT provides general information, not legal advice. Consult a licensed attorney for legal counsel.
      </Text>
    </Box>
  );
};

export default Index;
