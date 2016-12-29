import { Projekt2Page } from './app.po';

describe('projekt2 App', function() {
  let page: Projekt2Page;

  beforeEach(() => {
    page = new Projekt2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
