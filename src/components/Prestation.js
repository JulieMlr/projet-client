import { ChakraProvider, Heading, Card, CardHeader, CardBody, Text, Avatar, Button } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc} from "firebase/firestore";
import { db } from '../firebase';
import { TimeIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useParams} from 'react-router-dom';
import React from 'react';


function Prestation() {

    const [listPrestataire, setListPrestataire] = useState(Array)
    const [isLoading, setIsLoading] = useState(Boolean)
    const [date, setDate] = useState(Date)

    const params = useParams();

    const navigate = useNavigate()

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

        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const planning = async (id) => {
        await addDoc(collection(db, 'planning'), {
            idClient: params.idClient,
            date:date,
            idDocteur: id,
        })
    }

    const handleDateChange = (date) => {
        setDate(date.target.value)
    }

    return (

        <ChakraProvider>
           <Button colorScheme='facebook' size='sm' onClick={() => navigate('/rendez-vous/'+params.idClient)}>Mes rendez-vous</Button>
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
                            <input onChange={handleDateChange} type="date"></input>
                            <Button colorScheme='facebook' size='sm' onClick={() => planning(data.id)}>Prendre un rendez-vous</Button>
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