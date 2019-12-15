import karna from "../../lib/index";
import initializeServer, { server } from "./static"

beforeAll(async () => {
  await karna({
    entry: "./test/e2e/mock_project_browser/src/index.js",
    output: "./test/e2e/mock_project_browser/public/"
  });
  return initializeServer();
})

describe('e2e', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080');
  });

  it('Work as a .js bundle providing content', async () => {
    const heading = await page.$("h1");
    const headingText = await page.evaluate(element => element.textContent, heading);
    expect(headingText).toEqual("message21");
  });
});

afterAll(() => {
  server.close(() => ({
  }))
});
