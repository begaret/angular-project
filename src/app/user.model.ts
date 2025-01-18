export class User
{
  name: string;
  email: string;
  country: string;
  city: string;
  password: string;

  constructor(
    name: string,
    email: string,
    country: string,
    city: string,
    password: string)
  {
    this.name = name;
    this.email = email;
    this.country = country;
    this.city = city;
    this.password = password;
  }
}

