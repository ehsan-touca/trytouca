// Copyright 2022 Touca, Inc. Subject to Apache-2.0 License.
// to be removed as part of "Synchronized Comparison" project

import { NextFunction, Request, Response } from 'express'

import { getComparisonJobs } from '@/models/comparison'
import { config } from '@/utils/config'

export async function comparisonList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const jobs = config.services.comparison.enabled
    ? { messages: [], comparisons: [] }
    : await getComparisonJobs()
  return res.status(200).json(jobs)
}
