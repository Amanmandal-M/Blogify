import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function SignUp() {
  const baseUrl = "http://18.208.158.182:8080";
  const registerUrl = `${baseUrl}/user/register`;

  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    profileImage: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    // Convert phone number to integer using parseInt
  const newValue = id === "phoneNumber" ? parseInt(value, 10) : value;

    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: newValue,
    }));
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      // Send POST request using Axios
      const response = await axios.post(registerUrl, formValues);

      // Check the response status
      if (response.status === 201) {
        // Registration successful
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          width: "30%",
          text:
            "You have successfully registered! Please check your email or phone for OTP verification.",
          timer:3500
        }).then(() => {
          window.location.href = "/login";
        });

        // Clear form values after successful registration
        setFormValues({
          username: "",
          profileImage: "",
          email: "",
          password: "",
          phoneNumber: "",
        });
      }
    } catch (error) {
      // Check the response status for 401
      if (error.response && error.response.status === 401) {
        // User already registered
        Swal.fire({
          icon: "warning",
          title: "Already a Member",
          width: "30%",
          text: "Please proceed for Login",
          timer: 3000,
        }).then(() => {
          // Redirect to login page
          window.location.href = "/login";
        });
      } else {
        // Other error status or network issue
        Swal.fire({
          icon: "error",
          title: "Registration Error",
          width: "30%",
          text: "An error occurred during registration. Please try again.",
        });
      }
  
      // Clear form values after error
      setFormValues({
        username: "",
        profileImage: "",
        email: "",
        password: "",
        phoneNumber: "",
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="username" isRequired>
                  <FormLabel>UserName</FormLabel>
                  <Input
                    type="text"
                    value={formValues.username}
                    onChange={handleInputChange}
                    placeholder="Please create unique username"
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="profileImage">
                  <FormLabel>Profile URL</FormLabel>
                  <Input
                    type="url"
                    value={formValues.profileImage}
                    onChange={handleInputChange}
                    placeholder="Please enter URL of profile image any URL"
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formValues.password}
                  onChange={handleInputChange}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="phoneNumber" isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="number"
                max={10}
                min={10}
                value={formValues.phoneNumber}
                onChange={handleInputChange}
                placeholder="Don't put 0 before your phone number"
              />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSignUp}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <RouterLink to="/login" color={"blue.400"}>
                  Login
                </RouterLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
