import { ChakraProvider, Heading, Card, CardHeader, CardBody, Text, Avatar, Button } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { TimeIcon } from '@chakra-ui/icons'


function Prestation() {

    const [listPrestataire, setListPrestataire] = useState(Array)
    const [isLoading, setIsLoading] = useState(Boolean)

    useEffect(() => {
        setIsLoading(false)
        const fetchData = async () => {
            const docSnap = await getDocs(collection(db, "docteurCollection"));
            return docSnap
        }
        let listeBis = []
        fetchData().then((res) => {
            res.forEach((r) => {
                listeBis.push(r.data());
            })
            setIsLoading(true)
            setListPrestataire(listeBis)
            console.log(listPrestataire)

        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <ChakraProvider>
            {isLoading ? listPrestataire.map((data, index) => {
                return (
                    <Card>
                        <CardHeader className="header-card-prestation">
                            <Avatar src='https://bit.ly/broken-link' />
                            <div>
                                <Heading size='sm'>{data.name}</Heading>
                                <Text>{data.adresse}</Text>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Button colorScheme='facebook' size='sm'>Prendre un rendez-vous</Button>
                        </CardBody>
                    </Card>
                )
            })
                : <TimeIcon />
            }
        </ChakraProvider>
    )
}

export default Prestation