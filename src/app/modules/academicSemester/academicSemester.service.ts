/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicSemester, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { academicSemesterSearchableFields } from './academicSemester.constants';
import { IAcademicSemesterFiltersFields } from './academicSemester.interface';

const create = async (data: AcademicSemester): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data,
  });
  return result;
};

const readMultiple = async (
  filters: IAcademicSemesterFiltersFields,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: academicSemesterSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // if (Object.keys(filtersData).length > 0) {
  //   andConditions.push({
  //     AND: Object.keys(filtersData).map(key => ({
  //       [key]: {
  //         equals: (filtersData as any)[key],
  //       },
  //     })),
  //   });
  // }
  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions: Prisma.AcademicSemesterWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicSemester.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });
  const total = await prisma.academicSemester.count({
    where: whereConditions,
  });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const readSingle = async (id: string): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.findUnique({
    where: { id },
  });
  return result;
};

const update = async (
  id: string,
  payload: Partial<AcademicSemester>
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleting = async (id: string): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.delete({
    where: { id },
  });
  return result;
};

export const AcademicSemesterService = {
  create,
  readMultiple,
  readSingle,
  update,
  deleting,
};
