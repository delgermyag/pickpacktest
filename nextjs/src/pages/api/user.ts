// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/common/prisma'
import { hash } from 'argon2';

export default async function Products(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const user = await prisma.user.findMany();

    if(user) {
      res.status(200).send(user);
    } else {
      res.status(204).json(null);
    };

  } else if(req.method === 'POST') {
    const data = req.body;

    const password = await hash(data.password);

    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: password
      }
    });

    if(user) {
      res.status(200).json({
        message: "User successfully added."
      });
    } else {
      res.status(405).json({
        message: "Please check your input"
      });
    };

  } else if(req.method === 'PUT') {
    const data = req.body;

    const password = await hash(data.password);

    const user = await prisma.user.update({
      data: {
        username: data.username,
        email: data.email,
        password: password
      },
      where: {
        id: data.id
      }
    });

    if(user) {
      res.status(200).json({
        message: `Product with id ${data.id} was updated.`
      })
    } else {
      res.status(405).json({
        message: `Product with id ${data.id} was not found.`
      })
    };

  } else {
    res.status(409).json({
      message: "Method not allowed"
    });
  };

};
