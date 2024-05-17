import { QuestionResponse } from '@interfaces/question.response';
import { environment } from 'environments/environment';

export const postQuestionUseCase = async (
  threadId: string,
  question: string
) => {
  try {
    console.log({ threadId, question });
    const resp = await fetch(`${environment.assistantApi}/user-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ threadId, question }),
    });

    const replies = (await resp.json()) as QuestionResponse[];

    return replies;
  } catch (error) {
    throw new Error('Error post question');
  }
};
