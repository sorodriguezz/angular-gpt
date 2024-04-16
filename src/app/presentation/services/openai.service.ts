import { Injectable } from '@angular/core';
import { orthographyUseCase } from '@use-cases/orthography/orthography.use-case';
import { prosConsUseCase } from '@use-cases/pros-cons/pros-cons.use-case';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenaiService {
  checkOrthography(prompt: string) {
    return from(orthographyUseCase(prompt));
  }

  prosConsDiscusser(prompt: string) {
    return from(prosConsUseCase(prompt));
  }
}
