import { motion } from "framer-motion";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import classes from './show-rooms.module.scss';

interface Room {
    _id: string,
    roomDescription: string,
    participants: number,
    participantsEmails: string[]
}

async function editRoom(selectedRoom: Room) {
    const response = await fetch(`/api/rooms/roomsAPI`, {
        method: 'PUT',
        body: JSON.stringify({
            editedRoom: selectedRoom
        }),
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

async function getAllRooms() {
    const response = await fetch(`/api/rooms/roomsAPI`, {
        method: 'GET',
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

async function deleteRoomById(id: string) {
    const response = await fetch(`/api/rooms/roomsAPI`, {
        method: 'DELETE',
        body: JSON.stringify({
            idToDelete: id
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        return null;
        // throw new Error(data.message || 'Something went wrong!');
    }
    return data;
}

function ShowRooms({ data }: any) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [rooms, setRooms] = useState<Room[]>(data);
    const [editedRoom, setEditedRoom] = useState<Room>({
        _id: '',
        roomDescription: '',
        participants: 0,
        participantsEmails: ['']
    });
    const [idToDelete, setIdToDelete] = useState<string>('');

    const handleOnClickSelectRoom = (selectedRoom: Room) => {
        // console.log('Selected: ' + JSON.stringify(selectedRoom));
        setEditedRoom(selectedRoom);
        setShow(true);
    }

    const handleOnChangeRoomDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setEditedRoom(prev => ({ ...prev, roomDescription: event.target.value }));
    }

    const updateRoom = async () => {
        await editRoom(editedRoom).then(response => {
            // setRooms(response);            
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Room Updated Successfully!',
                showConfirmButton: false,
                timer: 800
            }).then(async () => {
                const result = await getAllRooms();
                setRooms(result);
            });
        });

        const result = await getAllRooms();
        setRooms(result);
    }

    const handleOnChangeIdToDelete = (event: ChangeEvent<HTMLInputElement>) => {
        setIdToDelete(event.target.value);
    }

    const handleOnSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        // console.log(idToDelete);
        await deleteRoomById(idToDelete).then(response => {
            if (response) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Room Deleted Successfully!',
                    showConfirmButton: false,
                    timer: 800
                }).then(async () => {
                    const result = await getAllRooms();
                    setRooms(result);
                    setIdToDelete('');
                });
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Invalid Room Id!',
                    showConfirmButton: true,
                });
            }
        });
    }

    useEffect(() => {

        // console.log(data);
    }, []);

    return (
        <div className="container container-data">
            <h1>Current Rooms</h1>
            <hr></hr>
            <div className="d-flex flex-wrap">
                {
                    rooms.map((element: Room, index: number) => (
                        <motion.div
                            whileHover={{
                                scale: 1.1
                            }}
                            transition={{
                                type: "spring"
                            }}
                            key={index} onClick={() => handleOnClickSelectRoom(element)} className={`card ${classes.cardDesign}`}>
                            <div className="card-header">
                                <h4 className="text-center fw-bold">{element.roomDescription}</h4>
                            </div>

                            <div className="card-body">
                                <h5><b>Id:</b> <u>{element._id}</u></h5>
                                <h5><b>Participants:</b> <u>{element.participants}</u></h5>
                                {
                                    element.participantsEmails[0] ?
                                        <ul>
                                            {
                                                element.participantsEmails.map((email: string, index: number) => (
                                                    <li key={index}>
                                                        {email}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                        :
                                        <h5 className="fw-bold text-center">None</h5>
                                }
                            </div>
                        </motion.div>
                    ))
                }
            </div>
            <br></br>
            <br></br>
            <div className="container container-data">
                <h1 className="text-danger fw-bold">Danger Zone</h1>
                <br></br>
                <form onSubmit={handleOnSubmit}>
                    <div className="mb-3 row">
                        <label className="col-sm-1 col-form-label fw-bold text-end">Id </label>
                        <div className="col-sm-3">
                            <input onChange={handleOnChangeIdToDelete} type="text" className="form-control" />
                        </div>
                        <div className="col-sm-3">
                            <button type="submit" className="btn btn-danger">Delete!</button>
                        </div>
                    </div>
                </form>
                <div className="row">
                    <small className="fw-bold text-muted">Because of security reasons, you must insert the Room Id and delete it manually.</small>
                </div>
            </div>

            <Modal className='text-dark' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Room Description</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className='form-label fw-bold'>Id</label>
                            <input type='text' value={editedRoom?._id} readOnly className='form-control' />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label fw-bold'>Room Description</label>
                            <input type='text' value={editedRoom?.roomDescription} onChange={handleOnChangeRoomDescription} className='form-control' />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={async () => updateRoom()} className='btn btn-primary'>Save Changes</button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default ShowRooms;