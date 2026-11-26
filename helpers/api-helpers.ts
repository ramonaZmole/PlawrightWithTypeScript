import { request, type APIRequestContext } from '@playwright/test'
import { GetRoomsOutput } from './models/api/get-room-output'
import apiPath from '../helpers/api-paths'
import { requireEnv } from './env'

async function getRequestContext (): Promise<APIRequestContext> {
  return await request.newContext({
    baseURL: requireEnv('URL'),
    extraHTTPHeaders: { Accept: 'application/json' }
  })
}

async function getLoginToken (): Promise<string> {
  const context = await getRequestContext()
  try {
    const response = await context.post(apiPath.login, {
      data: {
        username: requireEnv('ADMIN_USERNAME'),
        password: requireEnv('ADMIN_PASSWORD')
      }
    })

    if (!response.ok()) {
      throw new Error(`Admin login failed with status ${response.status()}`)
    }

    const body: { token?: unknown } = await response.json()
    if (typeof body.token !== 'string' || body.token.length === 0) {
      throw new Error('Admin login response did not contain a token')
    }

    return body.token
  } finally {
    await context.dispose()
  }
}

export async function getRooms (): Promise<GetRoomsOutput> {
  const context = await getRequestContext()
  try {
    const response = await context.get(apiPath.room, {
      headers: {
        cookie: `token=${await getLoginToken()}`
      }
    })

    if (!response.ok()) {
      throw new Error(`Fetching rooms failed with status ${response.status()}`)
    }

    const rooms = await response.json() as GetRoomsOutput
    return rooms
  } finally {
    await context.dispose()
  }
}

export async function deleteRoom (roomName: number): Promise<void> {
  const roomsList = await getRooms()
  const room = roomsList.rooms.find(x => x.roomName === roomName)
  if (room === undefined) return

  const context = await getRequestContext()
  try {
    const response = await context.delete(`${apiPath.room}/${room.roomid}`, {
      headers: {
        cookie: `token=${await getLoginToken()}`
      }
    })

    if (!response.ok()) {
      throw new Error(`Deleting room ${roomName} failed with status ${response.status()}`)
    }
  } finally {
    await context.dispose()
  }
}
