import { faInfoCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from "react";
import classes from './view-messages.module.scss';
import fetch from 'isomorphic-fetch';
import SocketIOClient from "socket.io-client";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

interface Room {
    _id: string
    roomDescription: string,
    participants: number,
    participantsEmails: string[]
}

interface Message {
    userEmail: string,
    message: string,
    createdAt?: string
}

interface User {
    fullName: string,
    email: string,
    imageURL: string
}

async function saveMessageByRoomId(message: string, roomId: string) {
    const response = await fetch(`/api/messages/messagesByRoomId/${roomId}`, {
        method: 'POST',
        body: JSON.stringify({ message }),
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

async function emitGeneralMessage(message: string, roomId: string) {
    const response = await fetch(`/api/messages/emitGeneralMessageByRoomId/${roomId}`, {
        method: 'POST',
        body: JSON.stringify({ message }),
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

async function getMessagesByRoomId(roomId: string) {
    const response = await fetch(`/api/messages/messagesByRoomId/${roomId}`, {
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

async function checkIfExistsInRoom(roomId: string) {
    const response = await fetch(`/api/messages/checkUserInRoom/${roomId}`, {
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

async function getAllRooms() {
    const response = await fetch(`/api/rooms/roomsAPI/`, {
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

async function editRoom(editedRoom: Room) {
    const response = await fetch(`/api/rooms/roomsAPI/`, {
        method: 'PUT',
        body: JSON.stringify({
            editedRoom: editedRoom
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

function ViewMessages({ data }: any) {
    const inputRef: any = useRef(null);
    const [connected, setConnected] = useState<boolean>(false);
    const [rooms, setRooms] = useState<Room[] | null>(data.rooms);
    const [currentUser, setCurrentUser] = useState<User>(data.user);
    const [chat, setChat] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentRoom, setCurrentRoom] = useState<Room | null>();

    const handleOnClickRoom = async (selectedRoom: Room) => {
        setCurrentRoom(selectedRoom);

        const result = await checkIfExistsInRoom(selectedRoom._id);
        if (result) {
            await getMessagesByRoomId(selectedRoom._id).then((response) => {
                setChat([...response]);
            });

            let objDiv: any = document.getElementById("chat");
            objDiv.scrollTop = objDiv.scrollHeight;
        } else {
            await Swal.fire({
                title: 'Do you want to join?',
                text: "You will be joining the chat!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    selectedRoom.participantsEmails.push(currentUser.email);
                    selectedRoom.participants += 1;
                    const result = await editRoom(selectedRoom);
                    setCurrentRoom(result);
                    await emitJoinedMessage(result._id);
                    await getMessagesByRoomId(selectedRoom._id).then((response) => {
                        setChat([...response]);
                    });

                    let objDiv: any = document.getElementById("chat");
                    objDiv.scrollTop = objDiv.scrollHeight;

                    const response = await getAllRooms();
                    setRooms(response);
                } else {
                    setChat([]);
                    setCurrentRoom(null);
                }
            })
        }
    }

    const emitJoinedMessage = async (roomId: string) => {
        const message: string = `${currentUser.email} Joined the Chat`;
        const response = await emitGeneralMessage(message, roomId);
    }

    const emitExitMessage = async (roomId: string) => {
        const message: string = `${currentUser.email} Left the Chat`;
        const response = await emitGeneralMessage(message, roomId);
    }

    const handleOnChangeNewMessage = (event: ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
    }

    const handleOnSubmitMessage = async (event: SyntheticEvent) => {
        event.preventDefault();
        setNewMessage('');

        if (currentRoom?._id) {
            const response = await saveMessageByRoomId(newMessage, currentRoom._id);
            inputRef?.current?.focus();

            let objDiv: any = document.getElementById("chat");
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);


    const handleOnClickSeeParticipants = async () => {
        setShow(true);
    }

    const handleOnClickLeaveChat = async () => {
        await Swal.fire({
            title: 'Do you want to leave?',
            text: "You will be leaving the chat!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let editedRoom: Room = currentRoom!;
                let newArray: string[] = [];

                if (currentRoom) {
                    for (let i = 0; i < currentRoom?.participantsEmails.length; i++) {
                        if (currentRoom.participantsEmails[i] !== currentUser.email) {
                            newArray.push(currentRoom.participantsEmails[i]);
                        }
                    }
                    editedRoom.participants -= 1;
                    editedRoom.participantsEmails = newArray;

                    await emitExitMessage(currentRoom._id);
                    await editRoom(editedRoom).then(response => {
                        setChat([]);
                        setCurrentRoom(null);
                    });

                    const response = await getAllRooms();
                    setRooms(response);
                }

            }
        })
    }

    useEffect((): any => {
        if (currentRoom) {
            const socket = SocketIOClient('http://localhost:3000', {
                path: "/api/socket/socketioAPI"
            });

            socket.on("connect", () => {
                console.log("SOCKET CONNECTED!", socket.id);
                setConnected(true);
            });

            socket.on("message", (message: string, email: string, roomId: string) => {
                let newMessage: Message = ({
                    userEmail: email,
                    message: message
                });

                if (roomId === currentRoom?._id) {
                    setChat(prev => [...prev, newMessage]);
                    let objDiv: any = document.getElementById("chat");
                    objDiv ? objDiv.scrollTop = objDiv.scrollHeight : '';
                }
            });

            if (socket) return () => {
                //THIS GETS TRIGGERED WHENEVER CURRENTROOM CHANGES
                socket.disconnect();
            }
        }
    }, [currentRoom]);

    return (
        <div className="">
            <div className={`d-flex flex-row row ${classes.mainContainer}`}>
                <div className={`col-sm-3 ${classes.windowRooms}`}>
                    {
                        rooms?.map((element: Room, index: number) => (
                            <motion.div
                                whileHover={{
                                    backdropFilter: 'blur(13px)',
                                    backgroundColor: '#FFFF',
                                    opacity: 0.5,
                                    color: 'black'
                                }}
                                transition={{
                                    duration: 2,
                                    type: "spring"
                                }}
                                key={index}

                                className={`${classes.chatDiv} mb-3`} onClick={async () => handleOnClickRoom(element)}>
                                <div className="row container">
                                    <h5 className="fw-bold">{element.roomDescription}</h5>
                                </div>

                                <div className="row container">
                                    <h5 className="fw-bold">Current Participants: <u>{element.participants}</u></h5>
                                </div>
                            </motion.div>
                        ))
                    }

                </div>

                {
                    currentRoom ?
                        <div className={`col ${classes.windowChat} d-flex flex-column`}>

                            <div className={`d-flex flex-row ${classes.rowOptions} justify-content-center align-items-center`}>
                                <div className="col-sm-1">
                                    <button onClick={async () => handleOnClickSeeParticipants()} className={`btn btn-light btn-outline-dark btn-sm ${classes.buttonInfo}`}>
                                        <FontAwesomeIcon icon={faInfoCircle} /> Info</button>
                                </div>
                                <div className="col-sm-1">
                                    <button onClick={async () => handleOnClickLeaveChat()} className="btn btn-danger btn-outline-light btn-sm">Leave Chat</button>
                                </div>
                            </div>
                            <div
                                id="chat" className={`${classes.windowMessages}`}>
                                {
                                    chat.map((element: Message, index: number) => (
                                        element.userEmail === currentUser.email ?
                                            <div key={index} className={`${classes.messageDiv} row mb-3 text-end`}>
                                                <div className="row">
                                                    <span className="fw-bold fst-italic"><u>{element.userEmail}</u></span>
                                                </div>
                                                <div className="d-flex flex-row justify-content-end">
                                                    <div className={`${classes.bubble}`} style={{ marginRight: '1.4em' }}>
                                                        <OverlayTrigger
                                                            placement="left"
                                                            delay={{ show: 100, hide: 0 }}
                                                            overlay={<Tooltip id="button-tooltip-2">{element.createdAt ? new Date(element.createdAt).toLocaleTimeString() : ''}</Tooltip>}
                                                        >
                                                            <h6 className={`text-wrap ${classes.textBubble}`}>{element.message}</h6>
                                                        </OverlayTrigger>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            element.userEmail !== '-- GENERAL MESSAGE --' ?
                                                <div key={index} className={`${classes.messageDiv} row mb-3`}>
                                                    <div className="row">
                                                        <span className="fw-bold fst-italic"><u>{element.userEmail}</u></span>
                                                    </div>
                                                    <div className="d-flex flex-row">
                                                        <div className={`${classes.bubbleOtherPerson}`}>
                                                            <h6 className={`text-wrap ${classes.textBubble}`}>{element.message}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <div key={index} className={`${classes.messageDiv} row mb-3 text-center`}>
                                                    <div className="row">
                                                        <span className="fw-bold fst-italic"><u>{element.userEmail}</u></span>
                                                    </div>
                                                    <div className="d-flex flex-row justify-content-center">
                                                        <div className={`${classes.bubbleGeneralMessage}`}>
                                                            <h6 className={`text-wrap fw-bold ${classes.textBubbleGeneralMessage}`}>{element.message}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                    ))
                                }
                            </div>

                            <form onSubmit={handleOnSubmitMessage} className="d-flex flex-row justify-content-evenly">
                                <input ref={inputRef} type='text' className={`form-control ${classes.formSubmitMessage}`} placeholder="Click here to start typing." value={newMessage} onChange={handleOnChangeNewMessage} />
                                <button type="submit" className="btn btn-light btn-outline-dark"><FontAwesomeIcon icon={faPaperPlane} /></button>
                            </form>

                        </div>
                        :
                        <div className={`col ${classes.windowChat} d-flex flex-column justify-content-center align-items-center`}>
                            <h4 className="text-danger fw-bold text-center">Click in a room to start chatting!</h4>
                            <small className="fw-bold text-muted">Yes, at the left.</small>
                            <br></br>
                            <br></br>
                            <motion.img
                                animate={{
                                    rotate: 360
                                }}
                                transition={{
                                    type: 'spring',
                                    duration: 5,
                                    repeat: Infinity
                                }}
                                src='/static/images/Cat.png' alt='catDrawing' className={`${classes.catImage} shadow`} />
                            <br></br>
                            <small className="fw-bold text-muted">I'm rotating</small>
                        </div>}
            </div>

            <Modal show={show} className={`text-dark`} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Current Participants</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <ul>
                            {
                                currentRoom?.participantsEmails.map((element: string, index: number) => (
                                    <li key={index}>
                                        {element}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </Modal.Body>
            </Modal>

        </div >
    )
}

export default ViewMessages;