import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Textarea, Button, Image, Flex } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([{ text: "Hi, I'm LawGPT - an AI assistant for legal professionals. To get started, please provide your OpenAI API key.", isUser: false }]);
  const [apiKey, setApiKey] = useState("");
  const [apiKeyProvided, setApiKeyProvided] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleApiKeySubmit = () => {
    if (inputText.trim() !== "") {
      setApiKey(inputText.trim());
      setApiKeyProvided(true);
      setInputText("");
    }
  };

  const handleSendMessage = async () => {
    if (!apiKeyProvided) {
      setMessages([...messages, { text: "Please provide your OpenAI API key before asking a question.", isUser: false }]);
      return;
    }

    if (inputText.trim() !== "") {
      const newMessage = { text: inputText, isUser: true };
      setMessages([...messages, newMessage]);
      setInputText("");

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: newMessage.text }],
        }),
      });

      const data = await response.json();
      const responseMessage = { text: data.choices[0].message.content, isUser: false };
      setMessages([...messages, newMessage, responseMessage]);
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
        <Textarea value={inputText} onChange={handleInputChange} placeholder={apiKeyProvided ? "Enter your legal question or details..." : "Enter your OpenAI API key..."} mr={4} />
        <Button colorScheme="blue" onClick={apiKeyProvided ? handleSendMessage : handleApiKeySubmit} leftIcon={<FaPaperPlane />}>
          {apiKeyProvided ? "Send" : "Submit Key"}
        </Button>
      </Flex>

      <Text mt={8} color="gray.500">
        Disclaimer: LawGPT provides general information, not legal advice. Consult a licensed attorney for legal counsel.
      </Text>
    </Box>
  );
};

export default Index;
