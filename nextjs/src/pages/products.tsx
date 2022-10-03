import React, { useState } from "react";

const Products = () => {

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();

    const handleSubmit = async () => {
        const req = await fetch('http://localhost:3000/api/products', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                description: description,
                price: price! * 1,
                quantity: quantity! * 1
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(req) {
            return {
                status: 201,
                message: "Product successfully added"
            }
        } else {
            return {
                status: 409,
                message: "Please check your input"
            }
        };
    };

    return (
        <>
            <div className="container col-4 py-5 h-100 mt-5 py-auto bg-light bg-gradient">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" onChange={(e: any) => setName(e.target.value)}/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="text" className="form-control" id="price" onChange={(e: any) => setPrice(e.target.value)}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="desc" className="form-label">Description</label>
                        <input type="text" className="form-control" id="desc" onChange={(e: any) => setDescription(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input type="text" className="form-control" id="quantity" onChange={(e: any) => setQuantity(e.target.value)}/>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Add Product</button>
                    </div>
                </form>
            </div>
        </>
    );

};

export default Products;