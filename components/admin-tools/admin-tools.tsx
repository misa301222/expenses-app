import { faEye, faPlusSquare, faToolbox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import classes from './admin-tools.module.scss';

async function addNewRoom(roomDescription: string) {
    const response = await fetch(`/api/rooms/roomsAPI`, {
        body: JSON.stringify({
            roomDescription: roomDescription
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }

    return data;
}

function AdminTools() {
    const [roomDescription, setRoomDescription] = useState<string>('');
    const [show, setShow] = useState(false);
    const handleOnClickAddNewRoom = () => {
        setShow(true);
    }
    const handleClose = () => setShow(false);

    const handleOnChangeRoomDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setRoomDescription(event.target.value);
    }

    const saveRoom = async () => {
        await addNewRoom(roomDescription).then(response => {
            console.log(response);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Room Added Successfully!',
                showConfirmButton: false,
                timer: 800
            });
        });
        setRoomDescription('');
        setShow(false);
    }

    return (
        <div className="container container-data">
            <h1 className='text-center fw-bold'>Admin Tools <FontAwesomeIcon icon={faToolbox} /></h1>
            <hr></hr>
            <br></br>
            <br></br>
            <div className='container'>
                <h3 className='fw-bold'><u>Rooms</u></h3>
            </div>
            <div className={`d-flex flex-row justify-content-around`}>
                <motion.div
                    whileHover={{
                        scale: 1.1
                    }}
                    transition={{
                        type: "spring"
                    }}
                    onClick={() => handleOnClickAddNewRoom()}
                    className={`card ${classes.cardInfo}`}>
                    <FontAwesomeIcon icon={faPlusSquare} className={`${classes.iconDesign}`} />
                </motion.div>

                <motion.div
                    whileHover={{
                        scale: 1.1
                    }}
                    transition={{
                        type: "spring"
                    }}
                    className={`card ${classes.cardInfo}`}>
                    <Link href='/admin-tools/rooms/showRooms'><h1 className={`${classes.iconDesign}`}><FontAwesomeIcon icon={faEye} /></h1></Link>
                </motion.div>
            </div>

            <Modal className='text-dark' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className='mb-3'>
                            <label className='form-label fw-bold'>Room Description</label>
                            <input type='text' value={roomDescription} onChange={handleOnChangeRoomDescription} className='form-control' />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={async () => saveRoom()} className='btn btn-primary'>Save Changes</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AdminTools;