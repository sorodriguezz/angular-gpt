import { environment } from './../../../../environments/environment.development';

export async function* prosConsStreamUseCase(
  prompt: string,
  abortSignal: AbortSignal
) {
  try {
    const resp = await fetch(
      `${environment.backendApi}/pros-cons-discusser-stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
        signal: abortSignal,
      }
    );

    if (!resp.ok) throw new Error('No se pudo realizar la corrección');

    const reader = resp.body?.getReader();
    if (!reader) {
      console.log('no se pudo generar el reader');
      throw new Error('no se pudo generar el reader');
    }

    const decoder = new TextDecoder();
    let text = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const decoderChunk = decoder.decode(value, { stream: true });
      text += decoderChunk;
      yield text; // emitir texto en este momentos
    }

    return text; // corta la funcion generadora y retorna el texto completo
  } catch (error) {
    return null;
  }
}
