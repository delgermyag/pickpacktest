import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { prisma } from "@/common/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Spinner from "react-bootstrap/Spinner";
import HeroImage from "@/components/HeroImage";
import Products from "./products";
import Router from "next/router";
import Link from "next/link";

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/api/products');

    const products = await res.json();

    return {
        props: {
            products
        }
    };
};

const Home = ({ products } : any) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if(products) {
        setIsLoading(false)
      }
    }, []);

    const handleDelete = async (id : any) => {
      await fetch('http://localhost:3000/api/products', {
        method: 'DELETE',
        body: JSON.stringify({
          id: id * 1
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      Router.reload();
    };

    return (
    <>
      <div>
          <Navbar />
          <HeroImage />
          <Products />
            <div className="container-fluid bg-trasparent my-4 p-3" style={{position: 'relative'}}>
              <div className="d-flex flex-row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3"> 
                { isLoading ? <div className="row justify-content-center mt-5"><Spinner animation="grow" /></div> :
                  products.map((product : any) => (
                    <div className="col hp mx-2">
                      <div className="card h-100 shadow-sm">
                        <a>
                          <img src="https://m.media-amazon.com/images/I/81gK08T6tYL._AC_SL1500_.jpg" className="card-img-top mt-5" alt={product.name}/>
                        </a>
                        <div className="label-top shadow-sm">
                          <a className="text-white" href="#">{product.name}</a>
                        </div>
                        <div className="card-body">
                          <div className="clearfix mb-3">
                            <span className="float-start badge rounded-pill bg-success">{product.price}</span>
                          </div>
                          <h5 className="card-title">
                            <a target="_blank" href="#">{product.description}</a>
                          </h5>
                          <div className="d-grid gap-2 my-4">
                            <button className="btn btn-danger bold-btn" onClick={() => handleDelete(product.id)}>Delete product</button>
                          </div>
                          <div className="clearfix mb-1">
                            <span className="float-start"><i className="fas fa-question-circle" />{product.quantity}</span>
                            <span className="float-end">
                              <i className="far fa-heart" style={{cursor: 'pointer'}} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        <Footer />
      </>
    );
};

export default Home;