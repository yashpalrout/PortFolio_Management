import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = ({ onSignupClick }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      minH="80vh" // Reduce overall page height
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
      p={6} // Optional padding to center content within reduced height
    >
      <Stack
        flexDir="column"
        mb="4" // Increased margin below to add spacing
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" size="xl" /> {/* Increase Avatar size */}
        <Heading color="teal.400" fontSize="3xl"> {/* Larger font size for heading */}
          Welcome
        </Heading>
        <Box minW={{ base: "90%", md: "500px" }}> {/* Increase min width */}
          <form>
            <Stack
              spacing={6} // Increase spacing between form items
              p="2rem" // Increase padding for a larger look
              backgroundColor="whiteAlpha.900"
              boxShadow="lg"
              borderRadius="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="email" placeholder="Email address" fontSize="lg" /> {/* Increase font size */}
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    fontSize="lg" // Increase font size
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius="md"
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                size="lg" // Make the button larger
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box mt={4}> {/* Add margin for spacing */}
        New to us?{" "}
        <Link color="teal.500" onClick={onSignupClick}>
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;
