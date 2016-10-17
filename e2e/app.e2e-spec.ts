import { OResultsAngularPage } from './app.po';

describe('o-results-angular App', function() {
  let page: OResultsAngularPage;

  beforeEach(() => {
    page = new OResultsAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
