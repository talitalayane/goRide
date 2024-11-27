import React from 'react';
import { Box, Button, Flex, Text, VStack, Badge } from '@chakra-ui/react';

interface Driver {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
}

interface RideOptionsProps {
  options: Driver[];
  onSelectDriver: (driver: Driver) => void;
}

const RideOptions: React.FC<RideOptionsProps> = ({ options, onSelectDriver }) => {
  return (
    <VStack spacing={4} align="stretch">
      {options.map((driver) => (
        <Box key={driver.id} borderWidth="1px" borderRadius="lg" p={4}>
          <Flex justify="space-between">
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">{driver.name}</Text>
              <Text fontSize="sm">{driver.description}</Text>
              <Text fontSize="sm">Veículo: {driver.vehicle}</Text>
              <Flex align="center">
                <Badge colorScheme="green" mr={2}>
                  {driver.review.rating}/5
                </Badge>
                <Text fontSize="xs">{driver.review.comment}</Text>
              </Flex>
            </VStack>
            <VStack align="end" justify="space-between">
              <Text fontWeight="bold" fontSize="lg">
                R$ {driver.value.toFixed(2)}
              </Text>
              <Button colorScheme="blue" onClick={() => onSelectDriver(driver)}>
                Escolher
              </Button>
            </VStack>
          </Flex>
        </Box>
      ))}
    </VStack>
  );
};

export type { Driver };
export default RideOptions;

