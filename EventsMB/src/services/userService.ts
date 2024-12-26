import * as FileSystem from 'expo-file-system';

import userData from '../data/userData.json';
import { Ticket, User } from '../types';

const USER_FILE_PATH = FileSystem.documentDirectory + 'userData.json';

export async function getUser(): Promise<User> {
  try {
    const fileExists = await FileSystem.getInfoAsync(USER_FILE_PATH);

    let user: User;

    if (fileExists.exists) {
      const userDataString = await FileSystem.readAsStringAsync(USER_FILE_PATH);
      user = JSON.parse(userDataString);
    } else {
      user = userData;

      await FileSystem.writeAsStringAsync(USER_FILE_PATH, JSON.stringify(user, null, 2));
    }

    return user;
  } catch (error) {
    throw new Error('Erro ao obter os dados do usuário');
  }
}

export async function addTicketToUser(ticket: Ticket): Promise<User> {
  try {
    const fileExists = await FileSystem.getInfoAsync(USER_FILE_PATH);

    let user: User;

    if (fileExists.exists) {
      const userDataString = await FileSystem.readAsStringAsync(USER_FILE_PATH);
      user = JSON.parse(userDataString);
    } else {
      user = userData;

      await FileSystem.writeAsStringAsync(USER_FILE_PATH, JSON.stringify(user, null, 2));
    }

    user.tickets.push(ticket);

    await FileSystem.writeAsStringAsync(USER_FILE_PATH, JSON.stringify(user, null, 2));

    return user;
  } catch (error) {
    throw new Error('Erro ao adicionar ticket');
  }
}
