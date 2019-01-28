const UserContoller = require("./User");
const ListContoller = require("./List");
const DesinationContoller = require("./Destination");
const CountryContoller = require("./Country");
const HolidayContoller = require("./Holiday");

module.exports = {
  users: UserContoller.get,
  createUser: UserContoller.create,
  updateUser: UserContoller.create,
  signinUser: UserContoller.signin,
  deleteUser: UserContoller.delete,
  lists: ListContoller.get,
  createList: ListContoller.create,
  updateList: ListContoller.create,
  deleteList: ListContoller.delete,
  destinations: DesinationContoller.get,
  createDestination: DesinationContoller.create,
  updateDestination: DesinationContoller.create,
  deleteDestination: DesinationContoller.delete,
  country: CountryContoller.get,
  createCountry: CountryContoller.create,
  updateCountry: CountryContoller.create,
  deleteCountry: CountryContoller.delete,
  holidays: HolidayContoller.get
};
