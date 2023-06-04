import { connect } from 'mongoose';

export async function dbConnet(url: string) {
  try {
    await connect(url);
    console.log('DB Connected');
  } catch (error) {
    console.error(error);
  }
}
