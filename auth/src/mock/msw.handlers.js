import { delay, http, HttpResponse } from 'msw';
const jwtEncode = require('jwt-encode');
import faker from 'faker';

export const handlers = [
  http.post("/api/register", async ({ request }) => {
    // Mock time request
    await delay(1000);

    const requestBody = await request.json();

    const data = requestBody.content || {};

    if (!data.password || !data.email || !data.name) {
      return HttpResponse.json({ msg: "Empty data" }, { status: 400 });
    }

    return HttpResponse.json(
      {
        ...data,
        createdAt: new Date().toLocaleString(),
      },
      { status: 201 }
    );
  }),
  http.post("/api/login", async ({ request }) => {
    // Mock time request
    await delay(1000);

    const requestBody = await request.json();

    const data = requestBody.content || {};

    if (!data.password || !data.email) {
      return HttpResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    const userData = {
      ...data,
      name: faker.name.findName(),
      createdAt: new Date().toLocaleString(),
    }

    const token = await jwtEncode(userData, process.env.TOKEN_SECRET, { expiresIn: 99999999 });

    return HttpResponse.json(
      {
        ...userData,
        token,
      },
      { status: 200 }
    );
  }),
];
