import { Injectable } from '@angular/core';
import { createThreadUseCase } from '@use-cases/assistant/create-thread.use-case';
import { postQuestionUseCase } from '@use-cases/assistant/post-question.use-case';
import { audioToTextUseCase } from '@use-cases/audios/audio-to-text.use-case';
import { textToAudioUseCase } from '@use-cases/audios/text-to-audio.use-case';
import { imageGenerationUseCase } from '@use-cases/image-generation/image-generation.use-case';
import { imageVariationUseCase } from '@use-cases/image-generation/image-variation.use-case';
import { orthographyUseCase } from '@use-cases/orthography/orthography.use-case';
import { prosConsStreamUseCase } from '@use-cases/pros-cons/pros-cons-stream.use-case';
import { prosConsUseCase } from '@use-cases/pros-cons/pros-cons.use-case';
import { translateUseCase } from '@use-cases/translate/translate.use-case';
import { Observable, from, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenaiService {
  checkOrthography(prompt: string) {
    return from(orthographyUseCase(prompt));
  }

  prosConsDiscusser(prompt: string) {
    return from(prosConsUseCase(prompt));
  }

  prosConsStreamDiscusser(prompt: string, abortSignal: AbortSignal) {
    return prosConsStreamUseCase(prompt, abortSignal);
  }

  translate(prompt: string, lang: string) {
    return from(translateUseCase(prompt, lang));
  }

  textToAudio(prompt: string, voice: string) {
    return from(textToAudioUseCase(prompt, voice));
  }

  audioToText(file: File, prompt?: string) {
    return from(audioToTextUseCase(file, prompt));
  }

  imageGeneration(prompt: string, originalImage?: string, maskImage?: string) {
    return from(imageGenerationUseCase(prompt, originalImage, maskImage));
  }

  imageVariation(originalImage: string) {
    return from(imageVariationUseCase(originalImage));
  }

  createThread(): Observable<string> {
    if (localStorage.getItem('thread')) {
      return of(localStorage.getItem('thread')!);
    }

    return from(createThreadUseCase()).pipe(
      tap((thread) => {
        localStorage.setItem('thread', thread);
      })
    );
  }

  postQuestion(question: string, threadId: string) {
    return from(postQuestionUseCase(question, threadId));
  }
}
