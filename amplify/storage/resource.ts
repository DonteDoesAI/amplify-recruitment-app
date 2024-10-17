import { defineStorage } from '@aws-amplify/backend';

export const resumesBucket = defineStorage({
    name: 'resumesBucket',
    isDefault: true, // identify your default storage bucket (required)
    access: (allow) => ({
      '*/*': [
        allow.authenticated.to(['read', 'write', 'delete'])
      ]
    })
  });
  
  export const profilesBucket = defineStorage({
    name: 'profilesBucket',
    access: (allow) => ({
      '*/*': [
        allow.authenticated.to(['read', 'write', 'delete'])
      ]
    })
  });
  
  export const jobReqsBucket = defineStorage({
    name: 'jobReqsBucket',
    access: (allow) => ({
      '*/*': [
        allow.authenticated.to(['read', 'write', 'delete'])
      ]
    })
  });
  
