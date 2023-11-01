
interface Room {
  roomid: number;
  roomName: number;
  type: string;
  accessible: boolean;
  image: string;
  description: string;
  features: string[];
  roomPrice: number;
}

export interface GetRoomsOutput {
  rooms: Room[];
}
