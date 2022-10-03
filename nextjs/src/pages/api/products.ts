// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/common/prisma'

export default async function Products(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const products = await prisma.products.findMany();

    if(products) {
      res.status(200).send(products);
    } else {
      res.status(204).json(null);
    };

  } else if(req.method === 'POST') {
    const data = req.body;

    const products = await prisma.products.createMany({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity
      }
    });

    if(products) {
      res.status(200).json({
        message: "Products successfully added."
      });
    } else {
      res.status(405).json({
        message: "Please check your input"
      });
    };

  } else if(req.method === 'PUT') {
    const data = req.body;

    const products = await prisma.products.update({
      data: {
        description: data.description,
        name: data.description,
        price: data.price,
        quantity: data.quantity
      },
      where: {
        id: data.id
      }
    });

    if(products) {
      res.status(200).json({
        message: `Product with id ${data.id} was updated.`
      })
    } else {
      res.status(405).json({
        message: `Product with id ${data.id} was not found.`
      })
    };

  } else if (req.method === 'DELETE') {
    const data = req.body;

    const product = await prisma.products.delete({
      where: { id: data.id }
    });

    if(product) {
      res.status(200).json({
        message: `Product with id ${data.id} was deleted`
      })
    } else {
      res.status(409).json({
        message: `Product with id ${data.id} not found`
      })
    };

  } else {
    res.status(409).json({
      message: "Method not allowed"
    });
  };

};
