export class ForumOwner {

  constructor(
    private id: number,
    public name: string,
    public email: string
  ) {};

  getName(): string {
    return this.name;
  }
}
