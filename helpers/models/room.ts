import { faker } from '@faker-js/faker'
import RoomType from './enums/room-type'

export class Room {
  roomName: string = faker.number.int({ min: 1, max: 999 }).toString()
  type: string = RoomType[RoomType.Double]
  accessible: string = 'true'
  price: string = faker.number.int({ min: 1, max: 999 }).toString()
  roomDetails: string = 'TV'
}
