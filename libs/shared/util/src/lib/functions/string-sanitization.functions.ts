export const getSanitizedString = (value: string): string => {
  if (!value) return value;

  let sanitizedString = value;
  if (/[^\u2013]/.test(value)) {
    console.log(`${value} contained en dash`);
    sanitizedString = value.replace(/[\u2013]/g, '-');
  } else if (/[^\u2014]/.test(value)) {
    console.log(`${value} contained em dash`);
    sanitizedString = value.replace(/[\u2014]/g, '-');
  } else if (/[^\u2015]/.test(value)) {
    console.log(`${value} contained horizontal bar`);
    sanitizedString = value.replace(/[\u2015]/g, '-');
  } else if (/[^\u2017]/.test(value)) {
    console.log(`${value} contained double low line`);
    sanitizedString = value.replace(/[\u2017]/g, '-');
  } else if (/[^\u2018]/.test(value)) {
    console.log(`${value} contained left single quotation mark`);
    sanitizedString = value.replace(/[\u2018]/g, `'`);
  } else if (/[^\u2019]/.test(value)) {
    console.log(`${value} contained right single quotation mark`);
    sanitizedString = value.replace(/[\u2019]/g, `'`);
  } else if (/[^\u201b]/.test(value)) {
    console.log(`${value} contained single low-9 quotation mark`);
    sanitizedString = value.replace(/[\u201b]/g, `'`);
  } else if (/[^\u201c]/.test(value)) {
    console.log(`${value} contained single high-reversed-9 quotation mark`);
    sanitizedString = value.replace(/[\u201c]/g, `'`);
  } else if (/[^\u201d]/.test(value)) {
    console.log(`${value} contained left double quotation mark`);
    sanitizedString = value.replace(/[\u201d]/g, `"`);
  } else if (/[^\u201e]/.test(value)) {
    console.log(`${value} contained right double quotation mark`);
    sanitizedString = value.replace(/[\u201e]/g, `"`);
  } else if (/[^\u2026]/.test(value)) {
    console.log(`${value} contained horizontal ellipsis`);
    sanitizedString = value.replace(/[\u2026]/g, `...`);
  } else if (/[^\u2032]/.test(value)) {
    console.log(`${value} contained single prime`);
    sanitizedString = value.replace(/[\u2032]/g, `'`);
  } else if (/[^\u2033]/.test(value)) {
    console.log(`${value} contained double prime`);
    sanitizedString = value.replace(/[\u2033]/g, `"`);
  }

  return sanitizedString;
};
