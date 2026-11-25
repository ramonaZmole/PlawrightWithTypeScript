import Env from "./env"
import { request } from "@playwright/test";
import { GetRoomsOutput } from "./models/api/get-room-output";
import apiPath from "../helpers/api-paths"


async function getRequestContext() {
  return await request.newContext({
    baseURL: Env.URL,
    extraHTTPHeaders: { Accept: 'application/json', },
  });
}

async function getLoginToken() {
  const context = await getRequestContext();
  try {
    const response = await context.post(apiPath.login, {
      data: {
        username: Env.ADMIN_USERNAME,
        password: Env.ADMIN_PASSWORD,
      },
    });

    if (!response.ok()) {
      throw new Error(`Admin login failed with status ${response.status()}`);
    }

    const body: { token?: unknown } = await response.json();
    if (typeof body.token !== "string" || body.token.length === 0) {
      throw new Error("Admin login response did not contain a token");
    }

    return body.token;
  } finally {
    await context.dispose();
  }
}

export async function getRooms() {
  const context = await getRequestContext();
  try {
    const response = await context.get(apiPath.room, {
      headers: {
        cookie: `token=${await getLoginToken()}`
      },
    });

    if (!response.ok()) {
      throw new Error(`Fetching rooms failed with status ${response.status()}`);
    }

    return await response.json() as GetRoomsOutput;
  } finally {
    await context.dispose();
  }
}

export async function deleteRoom(roomName: number) {
  const roomsList = await getRooms();
  const room = roomsList.rooms.find(x => x.roomName === roomName);
  if (!room) return;

  const context = await getRequestContext();
  try {
    const response = await context.delete(`${apiPath.room}/${room.roomid}`, {
      headers: {
        cookie: `token=${await getLoginToken()}`
      },
    });

    if (!response.ok()) {
      throw new Error(`Deleting room ${roomName} failed with status ${response.status()}`);
    }
  } finally {
    await context.dispose();
  }
}
