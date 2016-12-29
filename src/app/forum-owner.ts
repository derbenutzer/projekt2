export class ForumOwner {
  id: number;
  name: string;
  email: string;

  constructor(id: number,name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  getName(): string {
    return this.name;
  }
}
