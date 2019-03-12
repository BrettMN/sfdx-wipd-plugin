/* eslint-disable no-console */
const forceUtils = require('../lib/forceUtils.js');
const {
  exec
} = require('child_process');


const cheerio = require('cheerio');

(function () {
  'use strict';

  module.exports = {
    topic: 'changeset',
    command: 'list',
    description: 'get a list of change sets',
    help: 'help text for wipd:changeset:list',
    flags: [{
      name: 'targetusername',
      char: 'u',
      description: 'username for the target org',
      hasValue: true
    }],
    run(context) {

      let targetUsername = context.flags.targetusername;

      forceUtils.getOrg(targetUsername, (org) => {
        org.force._getConnection(org, org.config).then((conn) => {

          targetUsername = org.authConfig.username;

          const changsetListCommand = `sfdx force:apex:execute -f apex/changesets.apex --json -u ${targetUsername}`;
          // const apexLogListCommand = `sfdx force:apex:log:list -u ${targetUsername} --json`;

          exec(changsetListCommand, { maxBuffer: 9999999999 }, (err, stdout, stderr) => {
            if (stderr && err) {
              console.log('changsetListCommand:stderr', stderr);
              return;
            }

            // console.log({ stdout });

            const changesetJsonOut = JSON.parse(stdout);

            // console.log({ changesetJsonOut });


            const result = changesetJsonOut.result;
            // console.log({ result });

            const logs = result.logs;
            // console.log({ logs });

            // console.log(`typeof logs: ${typeof logs}`);

            const indexOfBodyStart = logs.indexOf('<body');

            const indexOfBodyEnd = logs.indexOf('</body');

            // console.log({ indexOfBodyStart });
            // console.log({ indexOfBodyEnd });

            const bodyString = `${logs.substring(
              indexOfBodyStart,
              indexOfBodyEnd
            )}</body>`;

            // console.log({ stderr });
            // console.log('success?');

            if (stderr) {
              throw stderr;
            }

            const $ = cheerio.load(bodyString);
            let mappedRows;

            const tbodies = $('tbody');

            if (tbodies.length > 3) {
              const changesets = tbodies[3];

              if (changesets.attribs.id.indexOf('OutboundChangeSetList') > 0) {
                try {
                  mappedRows = changesets.children.map((row) => {
                    let name;
                    let description;
                    let status;
                    let modifiedBy;
                    let modifiedDate;
                    // TODO: Get id
                    // let id;

                    row.children.forEach((td) => {
                      if (td.attribs.id.indexOf('name') > 0) {
                        name = $(td)
                          .text()
                          .trim();
                      }
                      if (td.attribs.id.indexOf('description') > 0) {
                        description = $(td)
                          .text()
                          .trim();
                      }
                      if (td.attribs.id.indexOf('status') > 0) {
                        status = $(td)
                          .text()
                          .trim();
                      }
                      if (td.attribs.id.indexOf('modifiedby') > 0) {
                        modifiedBy = $(td)
                          .text()
                          .trim();
                      }
                      if (td.attribs.id.indexOf('modifieddate') > 0) {
                        modifiedDate = $(td)
                          .text()
                          .trim();
                      }



                    });

                    return {
                      name,
                      description,
                      status,
                      modifiedBy,
                      modifiedDate
                    };
                  });
                } catch (error) {
                  console.log(error);
                }

                console.log({ outboundChangesets: mappedRows });
              }
            }

          });
        });
      });
    }
  };
}());