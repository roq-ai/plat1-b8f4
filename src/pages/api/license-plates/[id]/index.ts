import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { licensePlateValidationSchema } from 'validationSchema/license-plates';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.license_plate
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getLicensePlateById();
    case 'PUT':
      return updateLicensePlateById();
    case 'DELETE':
      return deleteLicensePlateById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getLicensePlateById() {
    const data = await prisma.license_plate.findFirst(convertQueryToPrismaUtil(req.query, 'license_plate'));
    return res.status(200).json(data);
  }

  async function updateLicensePlateById() {
    await licensePlateValidationSchema.validate(req.body);
    const data = await prisma.license_plate.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteLicensePlateById() {
    const data = await prisma.license_plate.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
