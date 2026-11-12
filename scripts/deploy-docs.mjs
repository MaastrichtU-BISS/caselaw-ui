/** Send a signed push event only after this branch's library checks have passed. */
import {readFile} from 'node:fs/promises';
import {createHmac,randomUUID} from 'node:crypto';
const secret=process.env.COOLIFY_WEBHOOK_SECRET;
const eventPath=process.env.GITHUB_EVENT_PATH;
if(!secret||!eventPath)throw Error('The documentation deployment signing secret and GitHub event are required.');
const payload=await readFile(eventPath);
const event=JSON.parse(payload.toString());
if(event.ref!=='refs/heads/feature/biss-ui'||event.repository?.full_name!=='MaastrichtU-BISS/caselaw-ui')throw Error('Only the BISS UI branch may deploy these docs.');
const signature=createHmac('sha256',secret).update(payload).digest('hex');
const response=await fetch('https://coolify.wicker.life/webhooks/source/github/events/manual',{
  method:'POST',headers:{'Content-Type':'application/json','X-GitHub-Event':'push','X-GitHub-Delivery':randomUUID(),'X-Hub-Signature-256':'sha256='+signature},body:payload,
  signal:AbortSignal.timeout(30000),
});
if(!response.ok)throw Error('Documentation deployment was refused (HTTP '+response.status+').');
console.log('Documentation deployment requested after passing library checks (HTTP '+response.status+').');
