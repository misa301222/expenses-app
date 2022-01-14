import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import classes from './user-profile.module.scss';

async function editUserData(editedUser: any) {
  const response = await fetch('/api/user/userAPI', {
    method: 'PUT',
    body: JSON.stringify({
      editedUser: editedUser
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

async function editProfileInfo(editedProfileInfo: any) {
  const response = await fetch('/api/profileInfo/profileInfoAPI', {
    method: 'PUT',
    body: JSON.stringify({
      editedProfileInfo: editedProfileInfo
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

function UserProfile({ data }: any) {
  const [user, setUser] = useState(data.currentUser);
  const [editedUser, setEditedUser] = useState({
    _id: '',
    fullName: '',
    imageURL: '',
    privateInfo: false
  });

  const [profileInfo, setProfileInfo] = useState(data.profileInfo);
  const [editedProfileInfo, setEditedProfileInfo] = useState({
    descriptionHeader: '',
    description: '',
    coverURL: '',
    education: [''],
    hobbies: [''],
    imagesURL: [''],
    jobs: [''],
    location: '',
    phoneNumber: '',
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [showEditProfileInfo, setShowEditProfileInfo] = useState(false);
  const handleCloseEditProfileInfo = () => setShowEditProfileInfo(false);

  const [showEditHobbies, setShowEditHobbies] = useState(false);
  const handleCloseEditHobbies = () => setShowEditHobbies(false);

  const handleOnClickOpenModal = () => {
    setShow(true);
  }

  const handleOnClickOpenModalEditProfileInfo = () => {
    setShowEditProfileInfo(true);
  }

  const handleOnClickOpenModalEditHobbies = () => {
    setShowEditHobbies(true);
  }

  const handleOnChangeFullName = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedUser(prev => ({ ...prev, fullName: event.target.value }));
  }

  const handleOnChangeImageURL = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedUser(prev => ({ ...prev, imageURL: event.target.value }));
  }

  const handleOnChangePrivateInfo = (value: string) => {
    console.log(value);
    setEditedUser(prev => ({ ...prev, privateInfo: value === '1' ? true : false }));
  }

  const handleEditData = async () => {
    await editUserData(editedUser).then((response) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'User edited Successfully!',
        showConfirmButton: false,
        timer: 800
      }).then(
        () => {
          setShow(false);
          setUser(response);
        }
      );
    });
  }


  const handleOnChangeDescriptionHeader = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedProfileInfo(prev => ({ ...prev, descriptionHeader: event.target.value }));
  }

  const handleOnChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedProfileInfo(prev => ({ ...prev, description: event.target.value }));
  }

  const handleOnChangePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedProfileInfo(prev => ({ ...prev, phoneNumber: event.target.value }));
  }

  const handleOnChangeCoverURL = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedProfileInfo(prev => ({ ...prev, coverURL: event.target.value }));
  }

  const handleOnChangeLocation = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedProfileInfo(prev => ({ ...prev, location: event.target.value }));
  }

  const handleEditProfileInfo = async () => {
    await editProfileInfo(editedProfileInfo).then(response => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Profile Information Edited Successfully!',
        showConfirmButton: false,
        timer: 800
      }).then(
        () => {
          setShowEditProfileInfo(false);
          setProfileInfo(response);
          setEditedProfileInfo(response);
        }
      );
    });
  }

  const [showEditArray, setShowEditArray] = useState(false);
  const handleCloseEditArray = () => setShowEditArray(false);

  const handleOnClickOpenModalArray = (catalogId: number) => {
    setShowEditArray(true);
    setCurrentCatalog(catalogId);
  }

  const [arrayValue, setArrayValue] = useState({
    value: ''
  });

  const handleOnChangeArrayValue = (event: ChangeEvent<HTMLInputElement>) => {
    setArrayValue(prev => ({ ...prev, value: event.target.value }));
  }

  const [currentCatalog, setCurrentCatalog] = useState(0);

  const addNewArrayValue = async () => {
    let values: string[] = [];

    values.push(arrayValue.value);

    let editedObject: any = editedProfileInfo;
    switch (currentCatalog) {
      case 1:
        editedProfileInfo.hobbies.map((element: string, index: number) => {
          if (element)
            values.push(element);
        });
        editedObject.hobbies = values;
        break;

      case 2:
        editedProfileInfo.education.map((element: string, index: number) => {
          if (element)
            values.push(element);
        });
        editedObject.education = values;
        break;

      case 3:
        editedProfileInfo.jobs.map((element: string, index: number) => {
          if (element)
            values.push(element);
        });
        editedObject.jobs = values;
        break;
    }

    await editProfileInfo(editedObject).then(response => {
      console.log(response);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Data Updated Successfully!',
        showConfirmButton: false,
        timer: 800
      }).then(
        () => {
          setShowEditArray(false);
          setProfileInfo(response);
          setEditedProfileInfo(response);
        }
      );
    });

  }

  const deleteElement = async (descriptionToDelete: string, catalogId: number) => {
    let values: string[] = [];
    let editedObject: any = editedProfileInfo;

    switch (catalogId) {
      case 1:
        editedProfileInfo.hobbies.map((element: string, index: number) => {
          if (element && element !== descriptionToDelete)
            values.push(element);
        });
        editedObject.hobbies = values;
        break;

      case 2:
        editedProfileInfo.education.map((element: string, index: number) => {
          if (element && element !== descriptionToDelete)
            values.push(element);
        });
        editedObject.education = values;
        break;

      case 3:
        editedProfileInfo.jobs.map((element: string, index: number) => {
          if (element && element !== descriptionToDelete)
            values.push(element);
        });
        editedObject.jobs = values;
        break;
    }


    await editProfileInfo(editedObject).then(response => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Data Updated Successfully!',
        showConfirmButton: false,
        timer: 800
      }).then(
        () => {
          setShowEditArray(false);
          setProfileInfo(response);
          setEditedProfileInfo(response);
        }
      );
    });
  }


  useEffect(() => {
    console.log(data);
    setEditedUser(user);
    setEditedProfileInfo(profileInfo);
  }, []);

  return (
    <div className='container container-data'>
      <div className='header'>
        <h4>Dashboard</h4>
      </div>

      <div className={`${classes.mainContainer} text-dark container`}>
        <div className='row'>
          <div className='col'>
            <div className='container d-flex flex-row justify-content-center align-items-center'>
              <div className={`${classes.imageContainer} shadow-lg`}>
                <div className={`d-flex flex-column align-items-center`}>
                  <br></br>
                  {user.imageURL.length > 0 ?
                    <img src={user.imageURL} className={classes.imageThumbnail} />
                    :
                    <img src='/static/images/Blank.png' className={classes.imageThumbnail} />
                  }
                  <br></br>
                  <div className='row mb-2'>
                    <h5>Full Name: <u>{user.fullName}</u></h5>
                    <hr></hr>
                  </div>

                  <div className='row mb-2'>
                    <h5>Email: <u>{user.email}</u></h5>
                    <hr></hr>
                  </div>

                  <div className='row mb-2'>
                    <button onClick={() => handleOnClickOpenModal()} className='btn btn-dark btn-outline-light'>Edit Data</button>
                  </div>

                  <div className='container text-center'>
                    <small className='fw-bold text-muted'>Edit Information such as name, profile picture and set profile privacity.</small>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className='col mb-3'>
            <div className={`row ${classes.renglon} d-flex flex-row justify-content-center`}>
              <div className={`${classes.imageContainerSmall} shadow-lg`}>
                <h6 className='fw-bold text-center'>Customize your profile info</h6>
                <div className='text-center'>
                  <button className='btn btn-light btn-outline-dark shadow' onClick={() => handleOnClickOpenModalEditProfileInfo()}>Customize!</button>
                </div>
                <br></br>
                <br></br>
                <h6 className='fw-bold text-center'>Customize Your Hobbies, Education and Past Jobs</h6>
                <div className='text-center'>
                  <button className='btn btn-light btn-outline-dark shadow' onClick={() => handleOnClickOpenModalEditHobbies()}>Customize!</button>
                </div>
                <br></br>
                <br></br>
                <h6 className='fw-bold text-center'>View Own Profile</h6>
                <div className='text-center'>
                  <button className='btn btn-light btn-outline-dark shadow'>
                    <Link href={`/viewProfile/${user.email}`}>{user.email}</Link></button>
                </div>

              </div>
            </div>

            <div className={`row ${classes.renglon} d-flex flex-row justify-content-center`}>
              <div className={`${classes.imageContainerSmall} shadow-lg`}>

              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} className={`text-dark`} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className=''>
            <div className='mb-3'>
              <label className='fw-bold label-form' htmlFor=''>Full Name</label>
              <input type="text" className='form-control' value={editedUser.fullName} onChange={handleOnChangeFullName} />
            </div>

            <div className='mb-3'>
              <label className='fw-bold label-form' htmlFor=''>Image URL</label>
              <input type="text" className='form-control' value={editedUser.imageURL} onChange={handleOnChangeImageURL} />
            </div>

            <div className='mb-3'>
              <label className='fw-bold label-form' htmlFor=''>Private Profile</label>
              <select className='form-select' onChange={e => handleOnChangePrivateInfo(e.target.value)} value={editedUser.privateInfo ? '1' : '0'}>
                <option value={'1'}>Yes</option>
                <option value={'0'}>No</option>
              </select>
            </div>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button type="button" className='btn btn-primary' onClick={async () => handleEditData()}>Save Changes</button>
        </Modal.Footer>
      </Modal>

      <Modal size='lg' show={showEditProfileInfo} className={`text-dark`} onHide={handleCloseEditProfileInfo}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={`${classes.formStyle}`}>
            <div className='mb-3'>
              <label className='form-label fw-bold'>Description Header</label>
              <input type='text' className='form-control' value={editedProfileInfo.descriptionHeader} onChange={handleOnChangeDescriptionHeader} />
            </div>

            <div className='mb-3'>
              <label className='form-label fw-bold'>Description</label>
              <textarea rows={9} className='form-control' value={editedProfileInfo.description} onChange={handleOnChangeDescription} />
            </div>

            <div className='mb-3'>
              <label className='form-label fw-bold'>Phone Number</label>
              <input type='text' className='form-control' value={editedProfileInfo.phoneNumber} onChange={handleOnChangePhoneNumber} />
            </div>

            <div className='mb-3'>
              <label className='form-label fw-bold'>Cover URL</label>
              <input type='text' className='form-control' value={editedProfileInfo.coverURL} onChange={handleOnChangeCoverURL} />
            </div>

            <div className='mb-3'>
              <label className='form-label fw-bold'>Location</label>
              <input type='text' className='form-control' value={editedProfileInfo.location} onChange={handleOnChangeLocation} />
            </div>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditProfileInfo}>
            Close
          </Button>
          <button type="button" className='btn btn-primary' onClick={async () => handleEditProfileInfo()}>Save Changes</button>
        </Modal.Footer>
      </Modal>

      <Modal size='xl' show={showEditHobbies} className={`text-dark`} onHide={handleCloseEditHobbies}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={`${classes.formStyle}`}>
            <div className='d-flex flex-row justify-content-center'>
              <div className='col'>
                <div className='container d-flex flex-column align-items-center'>
                  <h5>Hobbies</h5>
                  <div className={`container ${classes.tableDiv}`}>
                    <table className='table table-bordered'>
                      <thead>
                        <tr className='text-center'>
                          <th>
                            Name
                          </th>
                          <th>
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <motion.tbody layout>
                        {
                          profileInfo.hobbies.map((element: string, index: number) => (
                            element ?
                              <tr key={index}>
                                <td>
                                  {element}
                                </td>

                                <td className='d-flex flex-row justify-content-evenly'>
                                  <button onClick={async () => deleteElement(element, 1)} type='button' className='btn btn-outline-dark btn-danger btn-sm text-light'>
                                    <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                </td>

                              </tr> : null
                          ))
                        }
                      </motion.tbody>
                    </table>
                  </div>

                  <div className=''>
                    <button type="button" className='btn btn-sm btn-primary' onClick={() => handleOnClickOpenModalArray(1)}>Add</button>
                  </div>

                </div>
              </div>
              <div className='col'>
                <div className='container d-flex flex-column align-items-center'>
                  <h5>Education</h5>
                  <div className={`container ${classes.tableDiv}`}>
                    <table className='table table-bordered'>
                      <thead>
                        <tr className='text-center'>
                          <th>
                            Name
                          </th>
                          <th>
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <motion.tbody layout>
                        {
                          profileInfo.education.map((element: string, index: number) => (
                            element ?
                              <tr key={index}>
                                <td>
                                  {element}
                                </td>

                                <td className='d-flex flex-row justify-content-evenly'>
                                  <button onClick={async () => deleteElement(element, 2)} type='button' className='btn btn-outline-dark btn-danger btn-sm text-light'>
                                    <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                </td>

                              </tr> : null
                          ))
                        }
                      </motion.tbody>
                    </table>
                  </div>
                  <div>
                    <button type="button" className='btn btn-sm btn-primary' onClick={() => handleOnClickOpenModalArray(2)}>Add</button>
                  </div>
                </div>
              </div>
              <div className='col'>
                <div className='container d-flex flex-column align-items-center'>
                  <h5>Jobs</h5>
                  <div className={`container ${classes.tableDiv}`}>
                    <table className='table table-bordered'>
                      <thead>
                        <tr className='text-center'>
                          <th>
                            Name
                          </th>
                          <th>
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <motion.tbody layout>
                        {
                          profileInfo.jobs.map((element: string, index: number) => (
                            element ?
                              <tr key={index}>
                                <td>
                                  {element}
                                </td>

                                <td className='d-flex flex-row justify-content-evenly'>
                                  <button onClick={async () => deleteElement(element, 3)} type='button' className='btn btn-outline-dark btn-danger btn-sm text-light'>
                                    <FontAwesomeIcon icon={faTrash} /></button>
                                </td>

                              </tr> : null
                          ))
                        }
                      </motion.tbody>
                    </table>
                  </div>

                  <div>
                    <button type="button" className='btn btn-sm btn-primary' onClick={() => handleOnClickOpenModalArray(3)}>Add</button>
                  </div>

                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditHobbies}>
            Close
          </Button>
          <button type="button" className='btn btn-primary' onClick={async () => handleEditProfileInfo()}>Save Changes</button>
        </Modal.Footer>
      </Modal>

      <Modal aria-labelledby="contained-modal-title-vcenter"
        centered show={showEditArray} className={`text-dark`} onHide={handleCloseEditArray}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={`${classes.formStyle}`}>
            <div className='mb-3'>
              <label className='form-label fw-bold'>Name</label>
              <input className='form-control' type='text' onChange={handleOnChangeArrayValue} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditArray}>
            Close
          </Button>
          <button type="button" className='btn btn-primary' onClick={async () => addNewArrayValue()}>Save Changes</button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default UserProfile;