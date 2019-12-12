import { MscPage } from './app.po';

describe('msc App', () => {
  let page: MscPage;

  beforeEach(() => {
    page = new MscPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
