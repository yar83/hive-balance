export const userAnswer = (user: any) => ({
  name: user.name,
  email: user.email,
  passHash: user.passHash,
});

export const apiaryAnswer = (apiary: any) => ({
  _id: apiary._id,
  title: apiary.title,
  owner: apiary.owner,
  coordinates: apiary.coordinates,
});

export const apiariesAnswer = (apiaries: any) => apiaries.map((apiary: any) => apiaryAnswer(apiary));
