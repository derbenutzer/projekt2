import {HomeComponent} from "./home.component";

describe('HomeComponent', () => {

  let home: HomeComponent;

  beforeEach(() => {
    home = new HomeComponent();
  });

  it('should have the correct title', () => {
    expect(home.title).toBe("Startseite");
  });

  }
);
