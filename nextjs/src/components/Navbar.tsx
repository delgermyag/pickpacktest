import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Nav, Button } from "react-bootstrap";
import { getSession, signOut } from "next-auth/react";

const Navbar = () => {

    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const login = async () => {
            const session = await getSession();

            if(session) {
                setIsLogged(true);
            } else {
                setIsLogged(false);
            };
        };

        login();
    }, []);

    return (
        <header>
            {/* Navbar */}
            <Nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
                <div className="container-xl">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarExample01" aria-controls="navbarExample01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarExample01">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item active">
                            <Link href="/"><a className="nav-link" aria-current="page">Home</a></Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/products"><a className="nav-link">Products</a></Link>
                            </li>
                            <li className="nav-item">
                            <Link href="/about"><a className="nav-link">About</a></Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav px-3">
                            {
                                isLogged ?
                                <Button className="btn btn-primary" onClick={ () => {
                                    signOut({ callbackUrl: '/', redirect: false })
                                    setIsLogged(false)
                                    }}>
                                    Logout
                                </Button>
                                :
                                <Link href='/login'>
                                <Button className="btn btn-primary">
                                    Login
                                </Button>
                                </Link>
                            }
                        </ul>
                    </div>
                </div>
            </Nav>
            {/* Navbar */}
        </header>
    );

};

export default Navbar;