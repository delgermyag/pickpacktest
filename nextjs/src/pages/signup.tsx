import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/SignIn.module.css';
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/router';

const Index: NextPage = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();

    const handleSubmit = async () => {
        const user = await fetch('http://localhost:3000/api/user', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
                username: username
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(user) {
            useRouter().push('/');
        } else {
            return null;
        }
    };

    return (
        <section className="h-100 d-inline-block w-100 p-3 gradient-form " style={{backgroundColor: '#fff'}}>
            {/* Head */}
            <Head>
                <title>PickPack</title>
                <meta name="PickPack" content="visit pickpack.mn" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* Head */}
            <div className="container py-5 h-100 mt-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-6">
                        <div className="card rounded-5 text-black">
                            <div className="row g-6">
                                <div className="col-lg-12">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <div className="text-center">
                                            <img src="https://thumbs.dreamstime.com/b/random-icon-trendy-modern-flat-linear-vector-random-icon-whi-random-icon-trendy-modern-flat-linear-vector-random-icon-white-130942557.jpg" style={{width: '185px'}} alt="logo" />
                                            <h4 className="mt-1 mb-5 pb-1">Welcome to PickPack Test</h4>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <p>Create your Account!</p>
                                            <div className="form-outline mb-4">
                                                <input type="email" id="form2Example1" className="form-control" placeholder="Email address" onChange={(e: any) => setEmail(e.target.value)}/>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="text" id="form2Example2" className="form-control" placeholder='Username' onChange={(e: any) => setUsername(e.target.value)}/>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="password" id="form2Example22" className="form-control" placeholder='Password' onChange={(e: any) => setPassword(e.target.value)}/>
                                            </div>
                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Sign Up</button>
                                            </div>
                                            <a className="d-flex text-muted justify-content-center" href="#!">Forgot password?</a>
                                        </form>
                                            <div className="d-flex align-items-center justify-content-center pb-4 mt-3">
                                                <p className="mb-0 me-3">Already have an account?</p>
                                                <Link passHref href="/login"><button type="button" className="btn btn-outline-danger">Login</button></Link>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Index;