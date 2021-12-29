import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import classes from './auth-form.module.scss';

async function createUser(email: string, password: string) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
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
  const emailInputRef = useRef<any>();
  const passwordInputRef = useRef<any>();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event: any) {
    event.preventDefault();
    console.log('submit');
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // optional: Add validation

    if (isLogin) {
      const result: any = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      console.log(result);

      if (!result.error) {
        localStorage.setItem('email', enteredEmail);
        router.replace('/home');
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section>
      <div className={`${classes.container} container`}>
        <h1 className='text-center'>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <br></br>
        <div className='d-flex flex-row justify-content-center'>
          <div className='card w-25 shadow'>
            <div className='card-body'>
              <form onSubmit={submitHandler} className=''>
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label'>Your Email</label>
                  <input type='email' className='form-control' id='email' required ref={emailInputRef} />
                </div>
                <div className='mb-3'>
                  <label htmlFor='password' className='form-label'>Your Password</label>
                  <input
                    type='password'
                    id='password'
                    required
                    ref={passwordInputRef}
                    className='form-control'
                  />
                </div>
                <div className='mb-3 text-center'>
                  <button className='btn btn-dark' type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>
                  <button
                    type='button'
                    onClick={switchAuthModeHandler}
                    className='btn btn-light'>
                    {isLogin ? 'Create new account' : 'Login with existing account'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthForm;