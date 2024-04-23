import { ProsConsResponse } from '@interfaces/pros-cons.response';
import { environment } from './../../../../environments/environment.development';

export const prosConsStreamUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(
      `${environment.backendApi}/pros-cons-discusser-stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!resp.ok) throw new Error('No se pudo realizar la corrección');

    const reader = resp.body?.getReader();
    if (!reader) {
      console.log('no se pudo generar el reader');
      throw new Error('no se pudo generar el reader');
    }
  } catch (error) {
    return null;
  }
};
