// Curated from KMD WorkZone 2026.1. Short paraphrases, not live infrastructure data.
const base = 'https://docs.workzone.kmd.net/2026_1/en-us/Content/';
export const sources = {
  containers: { title: 'WorkZone containers', url: base + 'WZCtnr_Guide/Containers.htm' },
  overview: { title: 'Container roles', url: base + 'WZCtnr_Guide/Containers_Overview.htm' },
  modules: { title: 'Modules and services', url: base + 'Get_started/Component_overview.htm' },
  changes: { title: 'Container release notes', url: base + 'WZCtnr_Guide/Whats_New.htm' },
  pdf: { title: 'PDF administration', url: base + 'WZPDF_AdminGuide/Home.htm' },
  scim: { title: 'SCIM provisioning', url: base + 'WZCnF_AdminGuide/Services/Azure_AD_SCIM.htm' }
};
const records = new Map();
function add(image, name, role, basis = 'Documented', source = 'containers', context = '') {
  records.set(`${image}|${name}`, { role, basis, source, context });
}
// Explicit container roles from the container reference. Keep duplicate names image-qualified.
add('wzo','office','Office user interface');
add('wzc','client','Browser client','Documented','modules','Manage cases, documents, contacts and processes.');
add('wzcnf','configurator','Administration interface','Documented','modules','Configure application features and organization-specific behavior.');
add('wzcs','landingpage','Landing interface');
add('wzo','api','Office API');
add('wzfo','staticfilesprovider','Office static assets');
add('wzdocumentmerge','documentmerge','Document merging');
add('wzpdf','pdfengine','PDF conversion','Documented','pdf','Produces PDF or PDF/A documents, on demand or in batches.');
add('wzpdf','pdfcrawler','PDF background worker');
add('wzlogic','subscriptionservice','CVR subscriptions');
add('wzlogic','cprsubscriptionservice','CPR subscriptions');
add('wzlogic','updateservice','Contact updates');
add('wzlogic','cprupdateservice','CPR updates');
add('wzcs','odata','Data API','Documented','modules','Exposes the WorkZone data model for database operations.');
add('wzcs','office','Office API');
add('wzcs','explorer','File Explorer integration','Documented','modules','Uses WebDAV to work with cases and documents.');
add('wzcs','scim','Identity provisioning','Documented','scim','Provisions Entra ID users into WorkZone; provisioning tokens are managed in Configurator.');
add('wzcs','wopi','Document editing API');
add('wzp','process','Process API');
add('wzcs','dbupgrade','Database upgrade');
add('wzp','postinit','Process package initialization','Documented','containers','Installs standard workflows and exposes Process configuration.');
add('wzp','init','Process setup');
add('wzpdf','init','PDF job setup');
add('wzlogic','init','Contact-service job setup');
add('wzo','init','Database initial data');
add('wzp','pushnotification','Mobile push delivery');
add('wzp','mailnotification','Email notification delivery');
add('wzp','mailagent','Smartmail delivery');
add('wzp','processagent','Service-workflow execution');
add('wzcs','agentocr','OCR worker','Documented','modules','Turns scanned text images into searchable text.');
// These container names exist in the diagram but the reviewed reference does not explain their exact implementation.
add('wzcs','agentadw','Directory-related background worker','Inferred');
add('wzcs','agentfix','Background maintenance worker','Inferred');
add('wzcs','agentsub','Subscription background worker','Inferred');
add('wzcs_autopurge','autopurge','Scheduled cleanup worker','Inferred');
add('wzcs','sourceimport','Background import worker','Inferred');
add('wzcs','wopiclient','Document editing client bridge','Inferred');
add('wzcs','notification','Notification delivery','Inferred','overview');
add('wzlogic','contactlookupservice','Contact lookup','Inferred','modules','WorkZone contact integration imports and updates CPR/CVR contact information.');
add('wzsp','frontend','SharePoint-facing interface','Inferred');
add('wzsp','spconnector','SharePoint integration connector','Inferred');
add('wzsp','spconnectorinit','Connector initialization','Inferred');
add('wzrs','wzrs','Reporting service','Inferred');
add('wzfo','upgrade','Office upgrade task','Inferred');
add('wzfo','init','Legacy Office initialization','Inferred');
add('wztc','client','Legacy Teams client','Inferred','changes');
add('wzcs','oauth2','Legacy authentication component','Documented','changes');
const unqualified = {
  'APIService containers|kmdtxtapi': { role:'AI text-analysis API', basis:'Inferred', source:'modules', context:'WorkZone uses KMDTxt language models to help identify sensitive information in PDFs.' },
  'Worker/agent containers|kmdtxtworker': { role:'AI text-analysis worker', basis:'Inferred', source:'modules', context:'WorkZone uses KMDTxt language models to help identify sensitive information in PDFs.' },
  'Other containers|workzoneapplicationproxy': { role:'Application request proxy', basis:'Inferred', source:'overview', context:'' }
};
const groupRoles = {
  'UI containers':'User interface', 'APIService containers':'Request handling',
  'Init containers':'One-time setup', 'Worker/agent containers':'Background work',
  'Messaging containers':'Message delivery', 'Other containers':'Supporting component'
};
export function getContainerInfo(item) {
  const name = item.name.trim().toLowerCase();
  const match = item.text.trim().match(/^workzone\/([a-z0-9_]+)$/i);
  const image = match?.[1].toLowerCase();
  const record = image ? records.get(`${image}|${name}`) : !item.text.trim() ? unqualified[`${item.group}|${name}`] : null;
  if (!record) return { role:groupRoles[item.group] || 'Custom container', basis:'Inferred', context:'Role inferred from the group only. No matching WorkZone component was identified.', image:match ? item.text.trim() : null, note:'', sources:[] };
  let note = '';
  if (image === 'wztc') note = 'Removed in 2025.1: Teams now runs from teams.workzone.cloud without a deployed Teams container.';
  if (image === 'wzfo' && name === 'init') note = 'Since 2025.3, wzfo/init has been replaced by wzo/init.';
  if (image === 'wzcs' && name === 'oauth2') note = '2026.1 deprecates wzcs.oauth2 authentication in favor of Microsoft Identity Platform.';
  if (image === 'wzpdf' && name === 'init') note = '2026.1 moves PDF init to Linux and introduces a separate webapi container.';
  return { ...record, image:match ? item.text.trim() : null, note, sources:[sources[record.source], ...(note && record.source !== 'changes' ? [sources.changes] : [])] };
}
