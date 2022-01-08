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

async function getProfileInfo() {
  const response = await fetch('/api/profileInfo/profileInfoAPI', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  console.log(data);

  return data;
}


function UserProfile({ data }: any) {
  const [user, setUser] = useState(data);
  const [editedUser, setEditedUser] = useState({
    _id: '',
    fullName: '',
    imageURL: ''
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleOnClickOpenModal = async () => {
    setShow(true);
    await getProfileInfo();
  }

  const handleOnChangeFullName = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedUser(prev => ({ ...prev, fullName: event.target.value }));
  }

  const handleOnChangeImageURL = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedUser(prev => ({ ...prev, imageURL: event.target.value }));
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

  useEffect(() => {
    setEditedUser(user);
  }, [])

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
                    <h5>Full Name: {user.fullName}</h5>
                    <hr></hr>
                  </div>

                  <div className='row mb-2'>
                    <h5>Email: {user.email}</h5>
                    <hr></hr>
                  </div>

                  <div className='row mb-2'>
                    <button onClick={() => handleOnClickOpenModal()} className='btn btn-dark btn-outline-light'>Edit Data</button>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className='col mb-3'>
            <div className={`row ${classes.renglon} d-flex flex-row justify-content-center`}>
              <div className={`${classes.imageContainerSmall} shadow-lg`}>

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

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button className='btn btn-primary' onClick={async () => handleEditData()}>Save Changes</button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default UserProfile;