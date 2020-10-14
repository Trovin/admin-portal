export class User {
  id: number;
  email: string;
  password: string;
  jwtToken: string;
  lastName: string;
  firstName: string;
  selectedAnswer: string;

  constructor(data?: User) {
    if (data) {
      this.id = data.id;
      this.email = data.email;
      this.password = data.password;
      this.jwtToken = data.jwtToken;
      this.lastName = data.lastName;
      this.firstName = data.firstName;
      this.selectedAnswer = data.selectedAnswer;
    }
  }
}
