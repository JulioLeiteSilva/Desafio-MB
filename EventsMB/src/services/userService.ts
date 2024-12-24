import * as FileSystem from 'expo-file-system';

import userData from '../data/userData.json';
import { Ticket, User } from '../types';

const USER_FILE_PATH = FileSystem.documentDirectory + 'userData.json';

export async function getUser(): Promise<User> {
  try {
    // Verificar se o arquivo já foi salvo no documentDirectory
    const fileExists = await FileSystem.getInfoAsync(USER_FILE_PATH);

    let user: User;

    if (fileExists.exists) {
      // Ler os dados existentes no documentDirectory
      const userDataString = await FileSystem.readAsStringAsync(USER_FILE_PATH);
      user = JSON.parse(userDataString);
    } else {
      // Usar o mock como dados iniciais
      user = userData;

      // Salvar os dados iniciais no documentDirectory
      await FileSystem.writeAsStringAsync(USER_FILE_PATH, JSON.stringify(user, null, 2));
    }

    return user;
  } catch (error) {
    throw new Error('Erro ao obter os dados do usuário');
  }
}

export async function addTicketToUser(ticket: Ticket): Promise<User> {
  try {
    // Verificar se o arquivo já foi salvo no documentDirectory
    const fileExists = await FileSystem.getInfoAsync(USER_FILE_PATH);

    let user: User;

    if (fileExists.exists) {
      // Ler os dados existentes no documentDirectory
      const userDataString = await FileSystem.readAsStringAsync(USER_FILE_PATH);
      user = JSON.parse(userDataString);
    } else {
      // Usar o mock como dados iniciais
      user = userData;

      // Salvar os dados iniciais no documentDirectory
      await FileSystem.writeAsStringAsync(USER_FILE_PATH, JSON.stringify(user, null, 2));
    }

    // Adicionar o novo ticket
    user.tickets.push(ticket);

    // Salvar os dados atualizados
    await FileSystem.writeAsStringAsync(USER_FILE_PATH, JSON.stringify(user, null, 2));

    return user;
  } catch (error) {
    throw new Error('Erro ao adicionar ticket');
  }
}
