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
  const response = await (await getRequestContext()).post(apiPath.login, {
    data: {
      username: Env.ADMIN_USERNAME,
      password: Env.ADMIN_PASSWORD,
    },
  });

  const headers = response.headers();
  let tokenString = headers["set-cookie"].split(";")[0];
  return tokenString.split("=")[1];
}

export async function getRooms() {
  const response = await (await getRequestContext()).get(apiPath.room, {
    headers: {
      cookie: `token=${await getLoginToken()}`
    },
  });
  return await response.json() as GetRoomsOutput;
}

export async function deleteRoom(roomName: number) {
  let roomsList = await getRooms();
  let roomId = roomsList.rooms.filter(x => x.roomName == roomName)[0].roomid;

  const response = await (await getRequestContext()).delete(`${apiPath.room}/${roomId}`, {
    headers: {
      cookie: `token=${await getLoginToken()}`
    },
  });
}
