import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/SignIn.module.css';
import { useCallback } from 'react';
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, ULogin } from '@/common/validation/auth';
import Link from "next/link";

const Index: NextPage = () => {
  const { register, handleSubmit } = useForm<ULogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(async (data: ULogin) => {
    await signIn('credentials', {...data, callbackUrl: `${window.location.origin}/`});
  }, []);

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <p>Please login to your account</p>
                      <div className="form-outline mb-4">
                        <input type="email" id="form2Example11" className="form-control" placeholder="Email address" {...register('email')}/>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="password" id="form2Example22" className="form-control" placeholder='Password' {...register('password')}/>
                      </div>
                      <div className="text-center pt-1 mb-5 pb-1">
                        <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Log in</button>
                      </div>
                      <a className="d-flex text-muted justify-content-center" href="#!">Forgot password?</a>
                    </form>
                    <div className="d-flex align-items-center justify-content-center pb-4 mt-3">
                      <p className="mb-0 me-3">Don't have an account?</p>
                      <Link href="/signup"><button type="button" className="btn btn-outline-danger">Create new</button></Link>
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