import React, { useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Card, CardHeader, CardBody, Input, ChakraProvider, Button, Link, Heading, Text } from '@chakra-ui/react'


function Connexion() {
    const email = useRef()
    const password = useRef()

    const connexion = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('connexion', user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }
    return (
        <ChakraProvider>
            <Card>
                <CardHeader>
                    <Heading size='md'>Formulaire de connexion</Heading>
                </CardHeader>
                <CardBody>
                    <form onSubmit={connexion}>
                        <Input type="text" ref={email} placeholder="Email" size='sm' />
                        <Input type="password" ref={password} placeholder="Mot de passe" size='sm' />
                        <Button type="submit" colorScheme='facebook' size='sm'>Connexion</Button>
                        <Text>
                            Vous n'avez pas de compte chez nous&nbsp;?{' '}
                            <Link color='facebook.500' href='/creation'>
                                S'inscrire
                            </Link>
                        </Text>
                    </form>
                </CardBody>
            </Card>
        </ChakraProvider>
    )
}

export default Connexion