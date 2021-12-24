interface Trivia {
    triviaQuestions: TriviaQuestion[],
    secretSantaGifter: string,
    secretSantaGifterPictureUri: string,
    secretSantaGift: string,
    creaturePoints: number[]
}

interface TriviaQuestion {
    qIndex: number, // The index of the question
    questionerName: string, // The name of the individual who answered the question
    questionerPictureUri: string, // The URI of the individual's picture
    values: string[], // The values given in the trivia question
    answerIndex: number, // The answer in the question
}

export { Trivia, TriviaQuestion };