import { type ClientSchema, a, defineData } from '@aws-amplify/backend';


const schema = a.schema({
  Sales: a
    .model({
      month: a.string().required(), 
      year: a.integer().required(), 
      total: a.float().required(),
      items: a.integer().required()
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['read', 'create', 'update', 'delete',])
    ]),

  Logs: a
    .model({
      level: a.string().required(),      // INFO | SUCCESS | WARN | ERROR
      message: a.string().required(),
      source: a.string(),
      timestamp: a.datetime().required(),
      sessionId: a.string(),
      userAgent: a.string(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['create', 'read']),
    ])
});



export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey"
  }
});


