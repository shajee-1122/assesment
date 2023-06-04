# assesment

Node Version.
v16.10.0

NPM version.
7.24.0

How To Run.
1 - npm install 

2- npm start 


Items Completed.

1 - Node Cluster Deployed
mongodb+srv://shajeegardezi4:<password>@cluster0.r1danfv.mongodb.net/

2 - model created for Entities (Agent, Organisation, Listing)

3 - Data Inserted using endpoints

4 - Endpoint that return a list of agents that belong to an organisation with a
    querystring parameter of organisation ID passed to it
    http://44.201.129.196/api/agents?organisationID=61261f4cbf386a0011c59d56

5 - Endpoint return a list of properties that belong to a specific agent with the
    querystring parameter of “agentID” passed to it
    http://44.201.129.196/api/listings?agentID=602386722cdb39001e18da08

6- Endpoint that return a list of properties that belong to all agents in an organisation
   with the querystring parameter of “organisationID” passed to it.
   http://44.201.129.196/api/listings?organisationID=61261f4cbf386a0011c59d56
