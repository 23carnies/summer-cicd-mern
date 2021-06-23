const mocha = require("mocha");
const chai = require("chai");
const mongoose = require("mongoose");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const restaurantController = require("../../controllers/restaurantController");
const expect = chai.expect;
chai.use(sinonChai);
// chai is an object with many methods and properties
// organize unit tests into 2 types of blocks
// describe
// it

// describe('what we are describing', () => {
//     it('should do something...', () => {

//     })
// });
describe("restaurantController", () => {
  describe("findById", () => {
    it("should return a model if found", async () => {
      // Arrange
      const sandbox = sinon.createSandbox();
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        json: sinon.spy(),
      };
      mongoose.Model.findById = sandbox
        .stub()
        .returns(Promise.resolve("banana"));
      // Act
      await restaurantController.findById(req, res);
      // Assert
      // Is res.json called and passed the string from the Promise.resolve above.
      expect(res.json).to.have.been.calledWith("banana");
    });
    it("should return an error message if an error occurs", async () => {
      //arrange
      const sandbox = sinon.createSandbox();
      const statusJsonSpy = sinon.spy();
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        json: sinon.spy(),
        // status: sinon.spy(),
        status: sinon.stub().returns({ json: sinon.spy() }),
      };

      mongoose.Model.findById = sandbox
        .stub()
        .returns(Promise.reject("error message"));
      //act
      await restaurantController.findById(req, res);
      await console.log("---");
      //assert
      expect(res.status).to.have.been.calledWith(422);
      expect(statusJsonSpy).to.have.been.calledWith("error message");
    });
  });
});
