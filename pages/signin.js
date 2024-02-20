import React, { useState } from 'react'

import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";

import { Formik, Form } from 'formik';
import * as Yup from "yup"
import Router from "next/router"

import styles from "../styles/signin.module.scss";

import Header from "../components/header"
import Footer from '../components/footer'
import LoginInput from '../components/inputs/logininput';
import CircledIconBtn from '../components/buttons/circledIconBtn';
import { getProviders, signIn } from 'next-auth/react';
import axios from 'axios';
import DotLoad from '../components/loaders/dotLoader';
import DotLoaderSpinner from '../components/loaders/dotLoader';

const initialValue = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: "",
}

export default function Signin({ providers }) {
  console.log(providers)
  const [user, setUser] = useState(initialValue);
  const [loading, setLoading] = useState(false)
  const { login_email, login_password, name, email, conf_password, password, error, success } = user

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  console.log(user)
  const loginValidation = Yup.object({
    login_email: Yup.string('Emial address is required.')
      .email('Please enter a valid email address'),
    login_password: Yup.string().required('Please provide a password')
  })

  const registrationValidation = Yup.object({
    name: Yup.string().required('What is your name ?').min(2, "First name must be between 2 and 16 characters").max(16, 'First name must be between 2 and 16 characters.').matches(/^[aA-zZ]/, 'Numbers and special characters are not allowed'),

    email: Yup.string()
      .required(
        'You will need this when you log in and  if you enver need to reset your password'
      )
      .email('Enter a valid email address'),

    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers, letters and puncution marks (such as ! and & )'
      )
      .min(6, "Password must be a mix of atleast 6 characters")
      .max(36, "Password cannot be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref('password')], 'Passwords must much'),
  })
  const country = {
    name: "Morocco",
    flag: "https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360",
  };

  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);
      setTimeout(() => {
        Router.push("/");
      }, 2000);
    } catch (error) {
      setLoading(false)
      setUser({ ...user, success: "", error: error.response.data.message })
    }
  }

  return (
    <>
    {
      loading && <DotLoaderSpinner loading={loading}/>
    }
      <div>
        <Header country={country} />
        <div className={styles.login}>
          <div className={styles.login__container}>
            <div className={styles.login__header}>
              <div className={styles.back__svg}>
                <BiLeftArrowAlt />
              </div>
              <span>
                We&apos;d be happy to join us ! <Link href="/">Go Store</Link>
              </span>
            </div>
            <div className={styles.login__form}>
              <h1>Sign in</h1>
              <p>
                Get access to one of the best Eshopping services in the world.
              </p>
              <Formik
                enableReinitialize
                initialValues={{
                  login_email,
                  login_password,
                }}
                validationSchema={loginValidation}
              >
                {(form) => (
                  <Form>
                    <LoginInput
                      type="text"
                      name="login_email"
                      icon="email"
                      placeholder="Email Address"
                      onChange={handleChange}
                    />
                    <LoginInput
                      type="password"
                      name="login_password"
                      icon="password"
                      placeholder="Enter your passowrd"
                      onChange={handleChange}
                    />
                    <CircledIconBtn
                      icon={""}
                      text={"Sign in "}
                      type={"submit"}
                    />
                    <div className={styles.forgot}>
                      <Link href={"/forgot"}>Forgot password ?</Link>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className={styles.login__socials}>
                <span className={styles.or}>Or continue with</span>
                <div className={styles.login__socials_wrap}>
                  {providers.map((provider) => {
                    if (provider.name == "Credentials") {
                      return;
                    }
                    return (
                      <div key={provider.name}>
                        <button
                          className={styles.social__btn}
                          onClick={() => signIn(provider.id)}
                        >
                          <img src={`../../icons/${provider.name}.png`} alt="" />
                          Sign in with {provider.name}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.login__container}>
            <div className={styles.login__form}>
              <h1>Sign up</h1>
              <p>
                Get access to one of the best Eshopping services in the world.
              </p>
              <Formik
                enableReinitialize
                initialValues={{
                  name,
                  email,
                  password,
                  conf_password
                }}
                validationSchema={registrationValidation}
                onSubmit={() => {
                  signUpHandler();
                }}
              >
                {(form) => (
                  <Form>
                    <LoginInput
                      type="text"
                      name="name"
                      icon="user"
                      placeholder={"Full name"}
                      onChange={handleChange}
                    />
                    <LoginInput
                      type="text"
                      name="email"
                      icon={"email"}
                      placeholder='Enter your email'
                      onChange={handleChange}
                    />
                    <LoginInput
                      type="password"
                      name="password"
                      icon="password"
                      placeholder="Enter Password"
                      onChange={handleChange}
                    />
                    <LoginInput
                      type="password"
                      name="conf_password"
                      icon="password"
                      placeholder="Re-Type Password"
                      onChange={handleChange}
                    />
                    <CircledIconBtn type="submit" text="Sign up" />
                  </Form>
                )}
              </Formik>
              <div className={styles.success}>{success && <span>{success}</span>}</div>
              <div className={styles.error}>{error && <span>{error}</span>}</div>
            </div>
          </div>
        </div>
        <Footer country={"Kenya"} />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = Object.values(await getProviders());

  return {
    props: { providers },
  }
}