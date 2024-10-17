import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { profilesBucket, jobReqsBucket, resumesBucket } from './storage/resource';

defineBackend({
  auth,
  data,
  profilesBucket,
  jobReqsBucket,
  resumesBucket
});
