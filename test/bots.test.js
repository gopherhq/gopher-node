import {
   getMailBotsClient,
} from "./testUtils/mbTestUtils";
import "./testUtils/nockMocks";
import { expect } from "chai";
const debug = require("debug")("mailbots-sdk");

let mbClient =  getMailBotsClient();

describe("MailBot Management", function() {
  
  it("should save user-level data bot save data", done => {
    mbClient.saveBotData({ three: "more" })
    .then(res => {
      expect(res).to.be.an("object");
      expect(res.data.three).to.equal("more");
      done();
    }).catch(err => {
      done(err);
    });
  });

  it("should get data about itself", done => {
    mbClient.mailbotGetSelf((err, res) => {
      if (err) done(err);
      expect(res).to.be.an("object");
      expect(res.mailbot.event_url).to.be.a("String");
      done();
    });
  });

  it("should let an 3rd party service send a bot event", done => {
    mbClient
      .sendEvent({
        event_url: process.env.EXAMPLE_BOT_EVENT_URL,
        type: "github.issue.opened",
        payload: { foo: "bar" }
      })
      .then(res => {
        expect(res.statusCode).to.equal(200);
        done();
      })
      .catch(done);
  });

  // This test requires two MailBots to be installed and live
  it.skip("should allow mailbots to send messages to each other", done => {
    mbClient
      .sendInterbotEvent({
        subdomain: process.env.EXAMPLE_BOT_SUBDOMAIN_2,
        payload: {
          foo: "bar"
        }
      })
      .then(res => {
        expect(res.statusCode).to.equal(200);
        done();
      })
      .catch(done);
  });

  it("should let a bot get data", done => {
    mbClient.getBotData((err, res) => {
      if (err) done(err);
      expect(res).to.be.an("object");
      expect(res.data.three).to.equal("more");
      done();
    });
  });
});
