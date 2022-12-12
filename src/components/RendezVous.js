import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChakraProvider, Card, CardBody } from '@chakra-ui/react'

function RendezVous() {

    const params = useParams();
    const [listeRendezVous, setListeRendezVous] = useState(Array)
    //const [dataDocteur, setDataDocteur] = useState(Array)
    //const [isLoading, setIsLoading] = useState(Boolean)

    useEffect(() => {
        const q = query(collection(db, "planning"), where("idClient", "==", params.idClient));

        const fetchData = async () => {
            const docSnap = await getDocs(q);
            return docSnap
        }
        let listBis = []
        fetchData().then((res) => {
            res.forEach((r) => {
                listBis.push(r.data());
            })
            setListeRendezVous(listBis)
            //searchDocteur();
        }).catch((err) => {
            console.log(err)
        })
    }, [params])

    /*const searchDocteur = () => {
        let q = null;
        listeRendezVous.map(elem => {
           q = query(collection(db, "docteurCollection"), where("id", "==", elem.idDocteur));
        })
        const fetchDataBis = async () => {
            const docSnap = await getDocs(q);
            return docSnap
        }
        let dataDocteurBis = [];
        fetchDataBis().then((res) => {
            res.forEach((r) => {
                dataDocteurBis.push(r.data());
            })
            setDataDocteur(dataDocteurBis)
            setIsLoading(true)
            console.log(dataDocteurBis)
        }).catch((err) => {
            console.log(err)
        })
    }*/


    return (
        <ChakraProvider>
            {listeRendezVous.map((rendezVous, index) => {
                return (
                    <Card key={index}>
                        <CardBody >
                            <div>{rendezVous.date}</div>
                            <div>{rendezVous.idDocteur}</div>
                        </CardBody>
                    </Card>
                )
            })}
        </ChakraProvider>
    )
}



export default RendezVous