export class User {
  id?: number;
  email: string;
  password: string;
  jwtToken?: string;
  lastName?: string;
  firstName?: string;
  selectedCountry: string;
  registrationDate?: Date;

  constructor(data?: User) {
    if (data) {
      this.id = data.id;
      this.email = data.email;
      this.password = data.password;
      this.jwtToken = data.jwtToken;
      this.lastName = data.lastName;
      this.firstName = data.firstName;
      this.selectedCountry = data.selectedCountry;
      this.registrationDate = data.registrationDate;
    }
  }
}
