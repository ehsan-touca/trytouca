// Copyright 2022 Touca, Inc. Subject to Apache-2.0 License.

import { pick } from 'lodash'

import { wslFindByUname, wslGetSuperUser } from '@/models/user'
import { MetaModel } from '@/schemas/meta'
import { UserModel } from '@/schemas/user'
import { config, configMgr } from '@/utils/config'
import logger from '@/utils/logger'

/**
 * Registers primary user during server startup.
 * Defining such user helps send notifications to other users
 * on behalf of the platform.
 */
export async function setupSuperuser() {
  // check if user is already registered in the database

  const user = await wslGetSuperUser()
  if (user) {
    return user._id
  }

  // otherwise register the user in the database

  const superuser = await UserModel.create({
    email: 'noreply@touca.io',
    fullname: 'Touca',
    password: 'supersafehash',
    platformRole: 'super',
    username: 'touca'
  })

  logger.info('startup stage: created superuser')
  return superuser._id
}

/**
 * Register a special "anonymous" user during server startup.
 * When a user removes their account, their activities such as their comments,
 * promotions, submissions etc will be assigned to this special user account.
 */
export async function setupAnonymousUser() {
  // check if user is already registered in the database

  const user = await wslFindByUname('anonymous')
  if (user) {
    return user._id
  }

  // otherwise register the user in the database

  const anonymousUser = await UserModel.create({
    email: 'anonymous@touca.io',
    fullname: 'Former User',
    password: 'supersafehash',
    platformRole: 'user',
    username: 'anonymous'
  })

  logger.info('startup stage: created anonymous user')
  return anonymousUser._id
}

// In August 2022, we added support for setting up a mail server through the
// web app. We plan to phase out support for the environment variables. Until
// then, for an intuitive user experience, we apply the environment variables
// to the database so that they always take precedence.
async function applyMailTransportEnvironmentVariables() {
  if (!configMgr.hasMailTransportEnvironmentVariables()) {
    return
  }
  const mail = pick(config.mail, ['host', 'pass', 'port', 'user'])
  await MetaModel.findOneAndUpdate({}, { $set: { mail } })
  logger.info('updated mail server based on environment variables')
}

export async function upgradeDatabase() {
  logger.info('database migration: performing checks')
  await applyMailTransportEnvironmentVariables()
  logger.info('database migration: checks completed')
  return true
}
