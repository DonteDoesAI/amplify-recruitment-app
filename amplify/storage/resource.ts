import { defineStorage } from '@aws-amplify/backend';

export const resumesBucket = defineStorage({
    name: 'resumesBucket',
    isDefault: true, // identify your default storage bucket (required)
    access: (allow) => ({
      'resumes/*': [
        allow.authenticated.to(['read', 'write', 'delete'])
      ]
    })
  });
  
  export const profilesBucket = defineStorage({
    name: 'profilesBucket',
    access: (allow) => ({
      'profiles/*': [
        allow.authenticated.to(['read', 'write', 'delete'])
      ]
    })
  });
  
  export const jobReqsBucket = defineStorage({
    name: 'jobReqsBucket',
    access: (allow) => ({
      'jobReqs/*': [
        allow.authenticated.to(['read', 'write', 'delete'])
      ]
    })
  });
  
