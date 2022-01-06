import { useState, useRef, useEffect, SyntheticEvent } from 'react';
import { getSession, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import classes from './auth-form.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faSignInAlt, faTerminal } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

async function createUser(fullName: string, email: string, password: string) {
  const response = await fetch('/api/auth/signupAPI', {
    method: 'POST',
    body: JSON.stringify({ fullName, email, password }),
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

function AuthForm() {
  const fullNameRef = useRef<any>();
  const emailInputRef = useRef<any>();
  const passwordInputRef = useRef<any>();
  // const { data: session, status } = useSession();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  useEffect(() => {
    const status = localStorage.getItem('isLoggedIn');
    if (status === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  async function submitHandler(event: SyntheticEvent) {
    event.preventDefault();
    let enteredFullName = '';
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    if (isLogin) {
      const result: any = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        setIsLoggedIn(true);
        localStorage.setItem('email', enteredEmail);
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        router.replace('/');
        Swal.fire({
          position: 'top-right',
          icon: 'success',
          title: 'Logged In Successfully!',
          showConfirmButton: false,
          timer: 800
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: result.error as string,
          showConfirmButton: true,
        });
      }
    } else {
      try {
        enteredFullName = fullNameRef.current.value;
        const result = await createUser(enteredFullName, enteredEmail, enteredPassword);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Account created Successfully!',
          showConfirmButton: false,
          timer: 800
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: error as string,
          showConfirmButton: true,
        });
      }
    }
  }

  return (
    <div className={`${classes.container} container`}>
      <div className={`container d-flex flex-row justify-content-center`}>
        <div className={`${classes.banner} shadow d-flex`}>
          <div className='container d-flex flex-column'>
            <br></br>
            <h2 className='text-center'>Hey you! Yes you!</h2>
            <hr></hr>
            <p className='fw-bold text-wrap'>Start tracking your expenses by creating an Account here~!
              <br></br><br></br>
              You can create an account by Selecting Create New Account, you need an email in order to SignUp.</p>
            <br></br>
            <div className='container text-center'>
              <h5>Expenses App Team <FontAwesomeIcon icon={faTerminal} /></h5>
            </div>
          </div>
        </div>

        <div>
          <div className='d-flex flex-row justify-content-center'>
            {!isLoggedIn ?
              <form onSubmit={submitHandler} className={`${classes.cardStyle}`}>
                <div className='mb-3'>
                  {/* <h3 className='text-center'>{isLogin ? 'Login' : 'Sign Up'}</h3> */}
                  {isLogin ?
                    <h3 className='text-center'>Login <FontAwesomeIcon icon={faSignInAlt} className={classes.blue} /> </h3> :
                    <h3 className='text-center'>Sign Up <FontAwesomeIcon icon={faSave} className={classes.blue} /> </h3>
                  }
                  <hr></hr>
                </div>
                {!isLogin ?
                  <div className='mb-3'>
                    <label htmlFor='fullName' className='form-label fw-bold'>Full Name</label>
                    <input type='text' className='form-control' id='fullName' required ref={fullNameRef} autoComplete='off' />
                  </div> : <div></div>
                }

                <div className='mb-3'>
                  <label htmlFor='email' className='form-label fw-bold'>Your Email</label>
                  <input type='email' className='form-control' id='email' required ref={emailInputRef} />
                </div>
                <div className='mb-3'>
                  <label htmlFor='password' className='form-label fw-bold'>Your Password</label>
                  <input
                    type='password'
                    id='password'
                    required
                    ref={passwordInputRef}
                    className='form-control'
                  />
                </div>
                <div className={`${classes.options} mb-3 d-flex flex-row justify-content-evenly`}>
                  <button className='btn btn-dark btn-outline-light' type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>
                  <button
                    type='button'
                    onClick={switchAuthModeHandler}
                    className='btn btn-light btn-outline-dark'>
                    {isLogin ? 'Create new account' : 'Login with existing account'}
                  </button>
                </div>
              </form> :
              <div className={`${classes.cardStyle}`}>
                <div className='container d-flex flex-column align-items-center'>
                  <h1 className='text-dark'>Welcome back!</h1>
                  <br></br>
                  <h5>Look at this cat!</h5>
                  <img src='/static/images/Cat.png' alt='catDrawing' className={classes.catImage} />
                  <br></br>
                  <small className='text-muted fw-bold fst-italic'>This is cute!</small>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;