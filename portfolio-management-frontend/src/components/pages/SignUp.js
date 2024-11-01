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
    Link,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  
  export default function SignupCard({ onLoginClick }) {
    const [showPassword, setShowPassword] = useState(false);
  
    return (
      <Flex
        minH={'80vh'} // Reduce height from 100vh to 80vh
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.50')}
      >
        <Stack spacing={6} mx={'auto'} maxW={'2xl'}> {/* Reduce vertical and horizontal padding */}
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.50')}
            boxShadow={'lg'}
            p={8} // Reduce padding inside the Box
            maxW="2xl"
            width="full"
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="phone" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input type="tel" placeholder="e.g. 123-456-7890" />
              </FormControl>
              <FormControl id="dob" isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <Input type="date" />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={8} pt={2}> {/* Reduce button padding */}
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={4}> {/* Reduce padding between text */}
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'} onClick={onLoginClick}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
